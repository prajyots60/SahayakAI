import { NextRequest, NextResponse } from "next/server";
import { PythonShell } from "python-shell";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      revenue,
      expenses,
      cash_on_hand,
      num_employees,
      industry,
      sub_sector,
    } = body;

    // Validate inputs
    if (
      !revenue ||
      !expenses ||
      !cash_on_hand ||
      !num_employees ||
      !industry ||
      !sub_sector
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Prepare input for Python script
    const inputData = {
      revenue: parseFloat(revenue),
      expenses: parseFloat(expenses),
      cash_on_hand: parseFloat(cash_on_hand),
      num_employees: parseInt(num_employees),
      industry,
      sub_sector,
    };

    // Run Python script
    const results = await new Promise<string>((resolve, reject) => {
      const pyshell = new PythonShell("predict.py", {
        mode: "text",
        pythonPath: process.cwd() + "/.venv/bin/python", // Using virtual environment Python
        scriptPath: process.cwd(),
      });

      pyshell.send(JSON.stringify(inputData));

      pyshell.on("message", (message) => {
        resolve(message);
      });

      pyshell.on("error", (error) => {
        reject(error);
      });

      pyshell.end((err) => {
        if (err) reject(err);
      });
    });

    const prediction = JSON.parse(results);

    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
