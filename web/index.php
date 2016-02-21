<?php

// wrapper for index.html, for the benefit of Heroku, which does not host HTML files
readfile('index.html');