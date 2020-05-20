#!/bin/bash
echo "I will install NPM packages on this project ..."

full_path=$(realpath $0)
dir_path=$(dirname $full_path)
#echo $dir_path

which npm
if [ $? -eq 0 ]
then
  ls -d $dir_path
  npm install --prefix $dir_path
#echo "The script ran ok"
  exit 0
else
  echo "npm is not installed on this system!" >&2
  exit 1
fi

#CODE NO
#1 - Catchall for general errors
#2 - Misuse of shell builtins (according to Bash documentation)
#126 - Command invoked cannot execute
#127 - “command not found”
#128 - Invalid argument to exit
#128+n - Fatal error signal “n”
#130 - Script terminated by Control-C
#255\* - Exit status out of range
