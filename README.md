Itxi Exercise

how to Run

git clone https://github.com/KamelAlAridi/ItxiExercise_Kamel.git
cd ItxiExercise_Kamel

Install dependencies

npm install

Start Metro bundler

npm start

start for android inside metro by pressing a
or in another terminal run
npm run android

to test deep link on android use
adb shell am start -W -a android.intent.action.VIEW -d "itxiexercise://set-company-id" com.itxiexercise
