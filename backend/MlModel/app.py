import pickle
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

# Create a new Flask web application instance
app = Flask(__name__)

# Load the model, scaler, and label encoder from the files
model = pickle.load(open('crop_recommendation.sav', 'rb'))
label_encoder = pickle.load(open('label_encoder.sav', 'rb'))

feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']

@app.route('/predict', methods=['POST'])
def predict():
    print('Request vann')
    # Get data from the request
    data = request.get_json()
    
    # Validate input data
    if not all(feature in data for feature in feature_names):
        return jsonify({'error': 'Missing input features'}), 400
    
    # Extract the data for each feature
    input_data = [data[feature] for feature in feature_names]
    
    # Convert into a DataFrame
    input_data_df = pd.DataFrame([input_data], columns=feature_names)

    
    # Predict using the model
    prediction = model.predict(input_data_df)


    # Inverse transform the prediction using label encoder
    prediction_labels = label_encoder.inverse_transform(prediction)

    # Get the first label (since we're predicting one instance)
    prediction_value = prediction_labels[0]

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction_value})


if __name__ == '__main__':
    app.run(debug=True)