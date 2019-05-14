import {setPreference} from "../lib";
setPreference({date:{long:"YYYY-MM-DD hh:mm"}});
const now = new Date();
console.log(now.timeAgo());