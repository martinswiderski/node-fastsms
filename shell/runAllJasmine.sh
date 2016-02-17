#!/usr/bin/env bash
PWD=`pwd`
clear
echo "Running jasmine-node tests in the context of $PWD ..."
echo ""
jasmine-node tests/ --verbose --junitreport --output reports/jasmine-node/
rm log/unit-test.log
touch log/unit-test.log
chmod 777 log/unit-test.log
