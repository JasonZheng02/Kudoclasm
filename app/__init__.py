# Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
# SoftDev pd2
# P04 -- Let the Data Speak
# 2020-05-11

from flask import Flask
from flask import render_template
from urllib.request import urlopen
import json

app = Flask(__name__)

@app.route('/')
def root():
    return "Basic starter app"



if __name__ == "__main__":
    app.debug = True
    app.run()