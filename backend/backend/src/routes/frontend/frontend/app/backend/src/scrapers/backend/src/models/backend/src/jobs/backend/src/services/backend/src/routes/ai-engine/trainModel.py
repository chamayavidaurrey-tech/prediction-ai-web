import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Dataset histórico
matches = pd.read_csv('historical_matches.csv')

features = matches[[
    'home_form',
    'away_form',
    'home_xg',
    'away_xg',
    'home_elo',
    'away_elo'
]]

labels = matches['winner']

X_train, X_test, y_train, y_test = train_test_split(
    features,
    labels,
    test_size=0.2
)

model = RandomForestClassifier(
    n_estimators=500,
    max_depth=12
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print('Accuracy:', accuracy)

joblib.dump(model, 'football_model
