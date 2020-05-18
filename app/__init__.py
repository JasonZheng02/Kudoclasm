# Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
# SoftDev pd2
# P04 -- Let the Data Speak
# 2020-05-11

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/map')
def worldMap():
    return render_template('map.html')



if __name__ == "__main__":
    app.debug = True
    app.run()