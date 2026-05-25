# Yolo-Salamader-Tracker

## Run Instructions
### Clone and enter the project
Clone the repo and open it in your editor.
## Backend
### 1. Create a virtual environment
#### macOS / Linux
```
python3 -m venv venv
source venv/bin/activate
```
### Windows (PowerShell):
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
python -m venv venv
venv\Scripts\activate
```
### 3. Install dependencies
```
pip install -r requirements.txt
```
### 4. Run the backend
```
python main.py
```

## Frontend
Open another terminal to run the frontend. 
### 1. Move into frontend folder
```
cd ./salamander-yolo
```
### 2. Install Dependencies
```
npm i
```

### 3. Run Project
```
npm run dev
```

## Color Masking Comparison
We found that color masking worked really well with the initial training video that was given to us during the first iteration of the Salamander Tracker. That video worked so well due to the plain background and limited variations in color, but once more intricate Salamander videos were introduced, color masking didn't do well in comparison to the YOLO model built in this class. While the YOLO model does a great job of tracking Salamanders in more complicated settings where the background isn't one seamless color, it does have its downfalls. Large video files take long to process depending on your GPU using the YOLO model, and require a fair amount of variety in the training data to accurately detect salamanders. 

Given more time, we would focus on improving the accuracy of the heatmpa. Ultralytics has many different configurable parameters you can pass into the `Heatmap()` function, allowing control over both visualization and object tracking behavior. Currently, the heatmap is generated as a circle with variable sizing, which can sometimes result in it occupying more space than intended. With additional time, we would fine tune these parameters to better control the shape and scale of the heatmap, producing a more precise and meaningful representation of where the Salamanders have been.
