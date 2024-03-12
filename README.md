# mood-music

## Installation

If you don't have ruby installed, install it - we recommend using rbenv on mac:
https://github.com/rbenv/rbenv

rvm is also an option:
https://rvm.io/rvm/install

install cocoapods:
sudo gem install cocoapods

create an .env.server file in the root directory and add the following:

```
MONGODB_URI=<get connection string from team>
CLIENT-ID=<get client id from team>
CLIENT_SECRET=<get client secret from team>
SERVER_SESSION_SECRET=<get session secret from team>
BASE_URL="http://localhost:3000"
```

install dependencies:
npm run deps

if you get an error installing glog, try running the following command:
```
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer/
```

install typescript node transpiler:
```
npm i -g tsx
```
whitelist your ip address in the mongodb atlas dashboard

## Running the app
currently, npm run ios is the best way to start the app - this will start the app on an ios simulator.