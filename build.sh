#!/bin/bash

cd vendor/formily && npm run build && cd ../..
poetry build