#!/bin/sh
npm install && cd src/base/ && sudo npm install bower -g && bower install && gulp dev
