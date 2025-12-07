#!/bin/sh

docker build -t somospye-landing .
docker run -d -p 4321:80 somospye-landing