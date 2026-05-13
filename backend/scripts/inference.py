from ultralytics import YOLO
from PIL import Image, ImageDraw
import cv2

model = YOLO("backend/yolo11n.pt")

results = model("C:/Users/magea/Documents/AppliedAI/Yolo-Salamader-Tracker/backend/data/salamander.jpg", conf=0.25)

results[0].save("output.jpg")