import sys
import json
import pandas as pd
import numpy as np
import joblib
import shap

# Load models and scaler
mlp_model = joblib.load('models/mlp_model.pkl')
scaler = joblib.load('models/scaler.pkl')
xgb_model = joblib.load('models/xgb_model.pkl')

def main():
    # Read input from stdin (JSON)
    input_data = json.load(sys.stdin)

    # Extract user input
    user_input = {
        'Revenue': float(input_data['revenue']),
        'Expenses': float(input_data['expenses']),
        'Cash_on_Hand': float(input_data['cash_on_hand']),
        'Num_Employees': int(input_data['num_employees']),
        'Industry': input_data['industry'],
        'Sub_Sector': input_data['sub_sector']
    }

    # Convert to DataFrame
    df_input = pd.DataFrame([user_input])

    # Feature Engineering
    df_input['Profit'] = df_input['Revenue'] - df_input['Expenses']
    df_input['Profit_Margin'] = df_input['Profit'] / (df_input['Revenue'] + 1)
    df_input['Cash_to_Expense'] = df_input['Cash_on_Hand'] / (df_input['Expenses'] + 1)
    df_input['Revenue_per_Employee'] = df_input['Revenue'] / (df_input['Num_Employees'] + 1)

    # Encode categorical
    industry_mapping = {
        'Manufacturing': 0,
        'Services': 1,
        'Retail': 2,
        'Food Processing': 3,
        'Handicrafts': 4
    }
    subsector_mapping = {
        'Leather': 0, 'Wood Products': 1, 'Rubber and Plastic': 2, 'Others': 3,  # Manufacturing
        'Consultancy': 4, 'IT Services': 5, 'Transport/Logistics': 6, 'Others': 7,  # Services
        'Fashion & Apparel': 8, 'Grocery': 9, 'Electronics': 10, 'Others': 11,  # Retail
        'Bakery': 12, 'Dairy Products': 13, 'Packaged Food': 14,  # Food Processing
        'Pottery': 15, 'Textiles': 16, 'Wood Crafts': 17  # Handicrafts
    }

    df_input['Industry'] = df_input['Industry'].map(industry_mapping)
    df_input['Sub_Sector'] = df_input['Sub_Sector'].map(subsector_mapping)

    numeric_features = ['Profit_Margin', 'Cash_to_Expense', 'Revenue_per_Employee']
    categorical_features = ['Industry', 'Sub_Sector']

    X_input = df_input[numeric_features + categorical_features]

    # Scale numeric features
    X_input.loc[:, numeric_features] = scaler.transform(X_input[numeric_features])

    # Predict with MLP
    prob = mlp_model.predict_proba(X_input)[0][1]
    pred_class = int(mlp_model.predict(X_input)[0])
    business_health_score = round((1 - prob) * 100, 2)

    # SHAP explanation using XGBoost
    # Create a background dataset with reasonable defaults
    background_data = {
        'Profit_Margin': [0.1, 0.2, 0.05],
        'Cash_to_Expense': [0.5, 1.0, 0.3],
        'Revenue_per_Employee': [5.0, 10.0, 2.0],
        'Industry': [0, 1, 2],
        'Sub_Sector': [0, 1, 2]
    }
    background = pd.DataFrame(background_data)
    
    # Work around XGBoost/SHAP compatibility issue by using the model's predict method
    try:
        # Try using the tree explainer with model output type
        explainer = shap.Explainer(xgb_model.predict, background)
        shap_values = explainer(X_input)
        shap_vals_row = pd.Series(shap_values.values[0], index=X_input.columns)
    except Exception as e:
        # Fallback: Use simple feature importance from the model
        print(f"Warning: SHAP failed, using feature importance instead: {e}", file=sys.stderr)
        feature_importance = xgb_model.feature_importances_
        shap_vals_row = pd.Series(feature_importance, index=X_input.columns)

    # Feature contributions
    feature_contributions = {}
    for feature, val in shap_vals_row.items():
        feature_contributions[feature] = round(val, 4)

    # Generate textual explanation
    risk_factors = []
    protective_factors = []

    for feature, val in shap_vals_row.items():
        if val > 0.01:
            risk_factors.append(feature)
        elif val < -0.01:
            protective_factors.append(feature)

    explanation = "This business is at "
    explanation += "high" if prob > 0.7 else "moderate" if prob > 0.4 else "low"
    explanation += " risk because "

    if risk_factors:
        explanation += ", ".join(risk_factors) + " increase the risk"
    if risk_factors and protective_factors:
        explanation += ", while "
    if protective_factors:
        explanation += ", ".join(protective_factors) + " help reduce it"
    explanation += "."

    # Output JSON
    output = {
        "predicted_class": pred_class,
        "probability": round(prob * 100, 2),  # Convert to percentage
        "business_health_score": business_health_score,
        "feature_contributions": feature_contributions,
        "reasoning_summary": explanation
    }

    print(json.dumps(output))

if __name__ == "__main__":
    main()
