# dri-dir
generate driving directions from google maps


How to do it:

1. Download this repo. Either with `git clone` or by downloading the zip file and extracting it. 
2. Install nodejs https://nodejs.org/en/
3. open up a command prompt and go to the folder where this file is in. 
4. run the command `npm install` It will download all the stuff it neads which will take a few moments
5. run the command `.\node_modules\.bin\http-server` This will start the internal website that hosts the google maps stuff. 
6. open up a second command prompt and run the command `node index` This will start the process that calls google maps for each of the addresses in the file

The input is a tab-delimited file called Mulch_2016.txt in this folder. Take a look at the file to see its format. It was extracted from an excel worksheet. Any file should work as long as the same things are in the same columns.
