import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle 

#Reads the data in to memory

data = pd.read_csv('data/house_data.csv')
#print("Columns in CSV:", data.columns)

#Input & Output

X = data[['area', 'bedrooms', 'location']]
#print(data.columns)

y = data['price']

#Training the ML model

model = LinearRegression()
model.fit(X,y)


#Save the trained model to disk(file)

with open("model/model.pkl", "wb") as f:
 pickle.dump(model, f)


print("Model trained successfuly")











