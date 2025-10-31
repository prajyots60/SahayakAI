import sys
import json
import pickle
import pandas as pd
from sentence_transformers import SentenceTransformer, util
import numpy as np

def load_scheme_data():
    """Load scheme data from CSV or create sample data if not available"""
    try:
        # Try to load from cleaned_schemes.csv
        df = pd.read_csv('cleaned_schemes.csv')
    except FileNotFoundError:
        # Create sample data if file doesn't exist
        data = {
            'Scheme_Name': [
                'MSME Credit Scheme',
                'Women Entrepreneur Scheme',
                'Startup India Scheme',
                'Digital India Initiative',
                'Make in India Campaign',
                'Skill India Mission',
                'Mudra Loan Scheme',
                'Stand Up India',
                'Pradhan Mantri Mudra Yojana',
                'Credit Guarantee Fund'
            ],
            'Description': [
                'Provides credit support to micro, small and medium enterprises',
                'Special scheme for women entrepreneurs with subsidized loans',
                'Comprehensive support for startups including funding and incubation',
                'Digital transformation initiatives for businesses',
                'Promotes manufacturing sector with incentives and support',
                'Skill development programs for entrepreneurs',
                'Micro Units Development and Refinance Agency scheme',
                'Scheme for SC/ST and women entrepreneurs',
                'Loan scheme for non-corporate, non-farm small/micro enterprises',
                'Credit guarantee scheme for MSMEs'
            ],
            'Type': [
                'Loan',
                'Loan',
                'Grant',
                'Subsidy',
                'Subsidy',
                'Training',
                'Loan',
                'Loan',
                'Loan',
                'Credit'
            ],
            'Who_Can_Apply': [
                'MSMEs with turnover up to 250 crore',
                'Women-led MSMEs',
                'Registered startups',
                'Businesses adopting digital technologies',
                'Manufacturing enterprises',
                'Entrepreneurs seeking skill development',
                'Micro enterprises',
                'SC/ST and women entrepreneurs',
                'Small business owners',
                'MSMEs seeking credit'
            ],
            'Official_Link': [
                'https://www.msme.gov.in/credit-scheme',
                'https://www.msme.gov.in/women-entrepreneur',
                'https://www.startupindia.gov.in',
                'https://www.digitalindia.gov.in',
                'https://www.makeinindia.com',
                'https://www.skillindia.gov.in',
                'https://www.mudra.org.in',
                'https://www.standupmitra.in',
                'https://www.mudra.org.in',
                'https://www.cgtmse.in'
            ]
        }
        df = pd.DataFrame(data)

    return df

def recommend_schemes(profile_text, top_k=10):
    """Recommend schemes based on profile text using semantic similarity"""

    # Load scheme data
    df = load_scheme_data()

    # Always create new model for now (since pickle has issues)
    scheme_names = df['Scheme_Name'].tolist()
    scheme_texts = (df['Scheme_Name'] + " " + df['Description'] + " " + df['Who_Can_Apply'] + " " + df['Type']).tolist()

    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
    scheme_emb = model.encode(scheme_texts)

    # Encode profile
    profile_emb = model.encode([profile_text])

    # Compute similarities
    similarities = util.cos_sim(profile_emb, scheme_emb)[0]

    # Get top indices
    top_indices = similarities.argsort(descending=True)[:top_k]

    recommendations = []
    for idx in top_indices:
        idx_int = int(idx)
        recommendations.append({
            'Scheme_Name': scheme_names[idx_int],
            'Description': df.iloc[idx_int]['Description'],
            'Type': df.iloc[idx_int]['Type'],
            'Who_Can_Apply': df.iloc[idx_int]['Who_Can_Apply'],
            'Official_Link': df.iloc[idx_int]['Official_Link'],
            'similarity': float(similarities[idx_int])
        })

    return recommendations

def main():
    try:
        # Read input from stdin
        input_data = sys.stdin.read().strip()
        if not input_data:
            raise ValueError("No input received")

        data = json.loads(input_data)
        profile = data.get('profile', '')

        if not profile:
            raise ValueError("Profile text is required")

        # Get recommendations
        schemes = recommend_schemes(profile)

        # Output JSON
        output = {
            'schemes': schemes,
            'total': len(schemes)
        }

        print(json.dumps(output))

    except Exception as e:
        error_output = {
            'error': str(e),
            'schemes': [],
            'total': 0
        }
        print(json.dumps(error_output), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
