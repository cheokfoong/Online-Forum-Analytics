const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '128.199.72.41',
    database: 'discourse',
    password: '1234',
    port: 15432,
});
//Get current date for querying data
const currentDate = new Date();
const queryCurrentDate = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + (currentDate.getDate()+1);
//Get date of 7 days ago
var aWeekAgo = new Date();
var tempWeek = aWeekAgo.getDate() - 7;
aWeekAgo.setDate(tempWeek);
//Get date of 14 days ago
var aTwoWeekAgo = new Date();
var tempTwoWeek = aTwoWeekAgo.getDate() - 14;
aTwoWeekAgo.setDate(tempTwoWeek);
//Getting date for a month ago
var monthAgo = new Date();
var tempMonth = monthAgo.getMonth()-1;
monthAgo.setMonth(tempMonth);
//Getting date for a year ago
var yearAgo = new Date();
var tempYear = yearAgo.getFullYear() - 1;
yearAgo.setFullYear(tempYear);
//Setting the dates such that it is mean for queries
var queryWeekAgo = aWeekAgo.getFullYear() + "-" + (aWeekAgo.getMonth()+1) + "-" +aWeekAgo.getDate();
var query2WeeksAgo = aTwoWeekAgo.getFullYear() + "-" + (aTwoWeekAgo.getMonth()+1) + "-" +aTwoWeekAgo.getDate();
var queryMonthAgo = monthAgo.getFullYear() + "-" +(monthAgo.getMonth()+1) + "-" +monthAgo.getDate();
var queryYearAgo = yearAgo.getFullYear() + "-" +(yearAgo.getMonth()+1) + "-" +yearAgo.getDate();

// console.log(queryWeekAgo);
// console.log(query2WeeksAgo);
// console.log(queryCurrentDate);
// console.log(queryMonthAgo);
//userID to be set and run by queries
var userID = 0;
//Collected query values will be passed into this array 
var returnValues = new Array();
//Score will be counted at the same time
var userScores = [];
//Variables to help set user topics data
var userTotalTopicsAllTime = 0;
var userTotalTopicsLastWeek = 0;
var userTotalTopicsLast2Weeks = 0;
var userTotalTopicsLastMonth = 0;
var userTotalTopicsLastYear = 0;

//Variables to help set user posts data
var userTotalPostsAllTime = 0;
var userTotalPostsLastWeek = 0;
var userTotalPostsLast2Weeks = 0;
var userTotalPostsLastMonth = 0;
var userTotalPostsLastYear = 0;

//Varaibles to help set user question topics data
var userTotalQuestionTopicsAllTime = 0;
var userTotalQuestionTopicsLastWeek = 0;
var userTotalQuestionTopicsLast2Weeks = 0;
var userTotalQuestionTopicsLastMonth = 0;
var userTotalQuestionTopicsLastYear = 0;

//Varaibles to help set user discussion topics data
var userTotalDiscussionTopicsAllTime = 0;
var userTotalDiscussionTopicsLastWeek = 0;
var userTotalDiscussionTopicsLast2Weeks = 0;
var userTotalDiscussionTopicsLastMonth = 0;
var userTotalDiscussionTopicsLastYear = 0;

//Varaibles to help set user voting poll topics data
var userTotalVotingPollTopicsAllTime = 0;
var userTotalVotingPollTopicsLastWeek = 0;
var userTotalVotingPollTopicsLast2Weeks = 0;
var userTotalVotingPollTopicsLastMonth = 0;
var userTotalVotingPollTopicsLastYear = 0;

//Varaibles to help set user social topics data
var userTotalSocialTopicsAllTime = 0;
var userTotalSocialTopicsLastWeek = 0;
var userTotalSocialTopicsLast2Weeks = 0;
var userTotalSocialTopicsLastMonth = 0;
var userTotalSocialTopicsLastYear = 0;

//Likes,views and replies from user's topics
var userTotalLikeTopicsAllTime = 0;
var userTotalViewsTopicsAllTime = 0;
var userTotalRepliesReceivedOnTopicsAllTime = 0;

var userTotalLikesTopicsLastWeek = 0;
var userTotalViewsTopicsLastWeek = 0;
var userTotalRepliesReceivedOnTopicsLastWeek = 0;

var userTotalLikesTopicsLastTwoWeek = 0;
var userTotalViewsTopicsLastTwoWeek = 0;
var userTotalRepliesReceivedOnTopicsTwoLastWeek = 0

var userTotalLikesTopicsLastMonth = 0;
var userTotalViewsTopicsLastMonth = 0;
var userTotalRepliesReceivedOnTopicsLastMonth = 0;

var userTotalLikesTopicsLastYear = 0;
var userTotalViewsTopicsLastYear = 0;
var userTotalRepliesReceivedOnTopicsLastYear = 0;

//Likes, reads and replies from user's posts
var userTotalLikePostsAllTime = 0;
var userTotalViewsPostsAllTime = 0;
var userTotalRepliesReceivedOnPostsAllTime = 0;

var userTotalLikesPostsLastWeek = 0;
var userTotalViewsPostsLastWeek = 0;
var userTotalRepliesReceivedOnPostsLastWeek = 0;

var userTotalLikesPostsLastTwoWeek = 0;
var userTotalViewsPostsLastTwoWeek = 0;
var userTotalRepliesReceivedOnPostsTwoLastWeek = 0;

var userTotalLikesPostsLastMonth = 0;
var userTotalViewsPostsLastMonth = 0;
var userTotalRepliesReceivedOnPostsLastMonth = 0;

var userTotalLikesPostsLastYear = 0;
var userTotalViewsPostsLastYear = 0;
var userTotalRepliesReceivedOnPostsLastYear = 0;

//Views read
var userTopicsViewedAllTime = 0;
var userTopicsViewedLastWeek = 0;
var userTopicsViewedLast2Weeks = 0;
var userTopicsViewedLastMonth = 0;
var userTopicsViewedLastYear = 0;

//Length of topic
var userTopicsLengthAllTime = 0;
var userTopicsLengthLastWeek = 0;
var userTopicsLengthLast2Weeks = 0;
var userTopicsLengthLastMonth = 0;
var userTopicsLengthLastYear = 0;

//Length of posts
var userPostsLengthAllTime = 0;
var userPostsLengthLastWeek = 0;
var userPostsLengthLast2Weeks = 0;
var userPostsLengthLastMonth = 0;
var userPostsLengthLastYear = 0;

//Time in milliseconds
var within24hrs = 86400000;
var within48hrs = 172800000;
var within72hrs = 259200000;
//Time between topics 
var userTopicAllTime24hours = 0;
var userTopicAllTime48hours = 0;
var userTopicAllTime72hours = 0;

var userTopicWeek24hours = 0;
var userTopicWeek48hours = 0;
var userTopicWeek72hours = 0;

var userTopic2Weeks24hours = 0;
var userTopic2Weeks48hours = 0;
var userTopic2Weeks72hours = 0;

var userTopicMonth24hours = 0;
var userTopicMonth48hours = 0;
var userTopicMonth72hours = 0;

var userTopicYear24hours = 0;
var userTopicYear48hours = 0;
var userTopicYear72hours = 0;

var userPollVotesAllTime = 0;
var userPollVotesWeekAgo = 0;
var userPollVotes2WeeksAgo = 0;
var userPollVotesMonthAgo = 0;
var userPollVotesYearAgo = 0;

//cheokfoong444@gmail.com
pool.query("SELECT * FROM public.user_emails WHERE email = 'fyp1g09@gmail.com'",(error,result)=>{
    if(error){
        reject(error)
    }
    userID = result.rows[0].user_id;
    //console.log("User id = " + userID)
});

//All the sql queries needed to extract certain data informations from the database
const allQueries = () => {
    return new Promise(function(resolve,reject){
        //Queries for user's total topics from all time
        pool.query("SELECT * FROM public.topics WHERE user_id = " + userID + " and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalTopicsAllTime = result.rowCount;
            returnValues[0]=userTotalTopicsAllTime;
        })
        //Queries for user's total topics from last week
        pool.query("SELECT * FROM public.topics WHERE user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalTopicsLastWeek = result.rowCount;
            returnValues[1]=userTotalTopicsLastWeek;
        })
        //Queries for user's total topics from last 2 weeks
        pool.query("SELECT * FROM public.topics WHERE user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalTopicsLast2Weeks = result.rowCount;
            returnValues[2]=userTotalTopicsLast2Weeks;
        })
        //Queries for user's total topics from last month
        pool.query("SELECT * FROM public.topics WHERE user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalTopicsLastMonth = result.rowCount;
            returnValues[3]=userTotalTopicsLastMonth;
        })
        pool.query("SELECT * FROM public.topics WHERE user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalTopicsLastYear = result.rowCount;
            returnValues[4]=userTotalTopicsLastYear;
        })
        pool.query("SELECT * FROM public.posts WHERE user_id = " + userID,(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalPostsAllTime = result.rowCount;
            returnValues[5]=userTotalPostsAllTime;
            //console.log("Total Posts = "+userTotalPostsAllTime);
        })
        pool.query("SELECT * FROM public.posts WHERE user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalPostsLastWeek = result.rowCount;
            returnValues[6]=userTotalPostsLastWeek;
            //console.log("Total Posts for the last 7 days = "+userTotalPostsLastWeek);
        })
        pool.query("SELECT * FROM public.posts WHERE user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalPostsLast2Weeks = result.rowCount;
            returnValues[7]=userTotalPostsLast2Weeks;
            //console.log("Total Posts from the past 7 days to past 14 days = "+userTotalPostsLast2Weeks);
        })
        pool.query("SELECT * FROM public.posts WHERE user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalPostsLastMonth = result.rowCount;
            returnValues[8]=userTotalPostsLastMonth;
            //console.log("Total Posts a month ago = "+userTotalPostsLastMonth);
        })
        pool.query("SELECT * FROM public.posts WHERE user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalPostsLastYear = result.rowCount;
            returnValues[9]=userTotalPostsLastYear;
            //console.log("Total Posts a year ago = "+userTotalPostsLastYear);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 6 and user_id = " + userID + " and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalQuestionTopicsAllTime = result.rowCount;
            returnValues[10]=userTotalQuestionTopicsAllTime;
            //console.log("Total Question topics = "+userTotalQuestionTopicsAllTime);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 6 and user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalQuestionTopicsLastWeek = result.rowCount;
            returnValues[11]=userTotalQuestionTopicsLastWeek;
            //console.log("Total Question topics for the last 7 days = "+userTotalQuestionTopicsLastWeek);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 6 and user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalQuestionTopicsLast2Weeks = result.rowCount;
            returnValues[12]=userTotalQuestionTopicsLast2Weeks;
            //console.log("Total Question topics from the past 7 days to past 14 days = "+userTotalQuestionTopicsLast2Weeks);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 6 and user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalQuestionTopicsLastMonth = result.rowCount;
            returnValues[13]=userTotalQuestionTopicsLastMonth;
            //console.log("Total Question topics a month ago = "+userTotalQuestionTopicsLastMonth);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 6 and user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalQuestionTopicsLastYear = result.rowCount;
            returnValues[14]=userTotalQuestionTopicsLastYear;
            //console.log("Total Question topics a year ago = "+userTotalQuestionTopicsLastYear);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 5 and user_id = " + userID + " and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalDiscussionTopicsAllTime = result.rowCount;
            returnValues[15]=userTotalDiscussionTopicsAllTime;
            //console.log("Total Discussion topics = "+userTotalDiscussionTopicsAllTime);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 5 and user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalDiscussionTopicsLastWeek = result.rowCount;
            returnValues[16]=userTotalDiscussionTopicsLastWeek;
            //console.log("Total Discussion topics for the last 7 days = "+userTotalDiscussionTopicsLastWeek);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 5 and user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalDiscussionTopicsLast2Weeks = result.rowCount;
            returnValues[17]=userTotalDiscussionTopicsLast2Weeks;
            //console.log("Total Discussion topics from the past 7 days to past 14 days = "+userTotalDiscussionTopicsLast2Weeks);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 5 and user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalDiscussionTopicsLastMonth = result.rowCount;
            returnValues[18]=userTotalDiscussionTopicsLastMonth;
            //console.log("Total Discussion topics a month ago = "+userTotalDiscussionTopicsLastMonth);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 5 and user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalDiscussionTopicsLastYear = result.rowCount;
            returnValues[19]=userTotalDiscussionTopicsLastYear;
           // console.log("Total Discussion topics a year ago = "+userTotalDiscussionTopicsLastYear);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 7 and user_id = " + userID + " and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalVotingPollTopicsAllTime = result.rowCount;
            returnValues[20]=userTotalVotingPollTopicsAllTime;
            //console.log("Total VotingPoll topics = "+userTotalVotingPollTopicsAllTime);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 7 and user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalVotingPollTopicsLastWeek = result.rowCount;
            returnValues[21]=userTotalVotingPollTopicsLastWeek;
           // console.log("Total VotingPoll topics for the last 7 days = "+userTotalVotingPollTopicsLastWeek);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 7 and user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalVotingPollTopicsLast2Weeks = result.rowCount;
            returnValues[22]=userTotalVotingPollTopicsLast2Weeks;
            //console.log("Total VotingPoll topics from the past 7 days to past 14 days = "+userTotalVotingPollTopicsLast2Weeks);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 7 and user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalVotingPollTopicsLastMonth = result.rowCount;
            returnValues[23]=userTotalVotingPollTopicsLastMonth;
            //console.log("Total VotingPoll topics a month ago = "+userTotalVotingPollTopicsLastMonth);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 7 and user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalVotingPollTopicsLastYear = result.rowCount;
            returnValues[24]=userTotalVotingPollTopicsLastYear;
            //console.log("Total VotingPoll topics a year ago = "+userTotalVotingPollTopicsLastYear);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 8 and user_id = " + userID + " and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalSocialTopicsAllTime = result.rowCount;
            returnValues[25]=userTotalSocialTopicsAllTime;
            //console.log("Total Social topics = "+userTotalSocialTopicsAllTime);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 8 and user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalSocialTopicsLastWeek = result.rowCount;
            returnValues[26]=userTotalSocialTopicsLastWeek;
            //console.log("Total Social topics for the last 7 days = "+userTotalSocialTopicsLastWeek);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 8 and user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalSocialTopicsLast2Weeks = result.rowCount;
            returnValues[27]=userTotalSocialTopicsLast2Weeks;
            //console.log("Total Social topics from the past 7 days to past 14 days = "+userTotalSocialTopicsLast2Weeks);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 8 and user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalSocialTopicsLastMonth = result.rowCount;
            returnValues[28]=userTotalSocialTopicsLastMonth;
            //console.log("Total Social topics a month ago = "+userTotalSocialTopicsLastMonth);
        })
        pool.query("SELECT * FROM public.topics WHERE category_id = 8 and user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "' and archetype = 'regular'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTotalSocialTopicsLastYear = result.rowCount;
            returnValues[29]=userTotalSocialTopicsLastYear;
            //console.log("Total Social topics a year ago = "+userTotalSocialTopicsLastYear);
        })
        pool.query("SELECT like_count,posts_count,views FROM public.topics WHERE archetype = 'regular' and user_id = " + userID,(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikeTopicsAllTime = 0;
            userTotalRepliesReceivedOnTopicsAllTime = 0;
            userTotalViewsTopicsAllTime = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikeTopicsAllTime = userTotalLikeTopicsAllTime + results.rows[i].like_count;
                userTotalRepliesReceivedOnTopicsAllTime = userTotalRepliesReceivedOnTopicsAllTime + results.rows[i].posts_count;
                userTotalViewsTopicsAllTime = userTotalViewsTopicsAllTime + results.rows[i].views;
            }
            returnValues[30] = userTotalLikeTopicsAllTime;
            returnValues[35] = userTotalRepliesReceivedOnTopicsAllTime - results.rowCount;
            returnValues[40] = userTotalViewsTopicsAllTime;
        })
        pool.query("SELECT like_count,posts_count,views FROM public.topics WHERE archetype = 'regular' and user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesTopicsLastWeek = 0;
            userTotalRepliesReceivedOnTopicsLastWeek = 0;
            userTotalViewsTopicsLastWeek = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesTopicsLastWeek = userTotalLikesTopicsLastWeek + results.rows[i].like_count;
                userTotalRepliesReceivedOnTopicsLastWeek = userTotalRepliesReceivedOnTopicsLastWeek + results.rows[i].posts_count;
                userTotalViewsTopicsLastWeek = userTotalViewsTopicsLastWeek + results.rows[i].views;
            }
            returnValues[31] = userTotalLikesTopicsLastWeek;
            returnValues[36] = userTotalRepliesReceivedOnTopicsLastWeek - results.rowCount;
            returnValues[41] = userTotalViewsTopicsLastWeek;
        })
        pool.query("SELECT like_count,posts_count,views FROM public.topics WHERE archetype = 'regular' and user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesTopicsLastTwoWeek = 0;
            userTotalRepliesReceivedOnTopicsTwoLastWeek = 0;
            userTotalViewsTopicsLastTwoWeek = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesTopicsLastTwoWeek = userTotalLikesTopicsLastTwoWeek + results.rows[i].like_count;
                userTotalRepliesReceivedOnTopicsTwoLastWeek = userTotalRepliesReceivedOnTopicsTwoLastWeek + results.rows[i].posts_count;
                userTotalViewsTopicsLastTwoWeek = userTotalViewsTopicsLastTwoWeek + results.rows[i].views;
            }
            returnValues[32] = userTotalLikesTopicsLastTwoWeek;
            returnValues[37] = userTotalRepliesReceivedOnTopicsTwoLastWeek- results.rowCount;
            returnValues[42] = userTotalViewsTopicsLastTwoWeek;
        })
        pool.query("SELECT like_count,posts_count,views FROM public.topics WHERE archetype = 'regular' and user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesTopicsLastMonth = 0;
            userTotalRepliesReceivedOnTopicsLastMonth = 0;
            userTotalViewsTopicsLastMonth = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesTopicsLastMonth = userTotalLikesTopicsLastMonth + results.rows[i].like_count;
                userTotalRepliesReceivedOnTopicsLastMonth = userTotalRepliesReceivedOnTopicsLastMonth + results.rows[i].posts_count;
                userTotalViewsTopicsLastMonth = userTotalViewsTopicsLastMonth + results.rows[i].views;
            }
            returnValues[33] = userTotalLikesTopicsLastMonth;
            returnValues[38] = userTotalRepliesReceivedOnTopicsLastMonth- results.rowCount;
            returnValues[43] = userTotalViewsTopicsLastMonth;
        })
        pool.query("SELECT like_count,posts_count,views FROM public.topics WHERE archetype = 'regular' and user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesTopicsLastYear = 0;
            userTotalRepliesReceivedOnTopicsLastYear = 0;
            userTotalViewsTopicsLastYear = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesTopicsLastYear = userTotalLikesTopicsLastYear + results.rows[i].like_count;
                userTotalRepliesReceivedOnTopicsLastYear = userTotalRepliesReceivedOnTopicsLastYear + results.rows[i].posts_count;
                userTotalViewsTopicsLastYear = userTotalViewsTopicsLastYear + results.rows[i].views;
            }
            returnValues[34] = userTotalLikesTopicsLastYear;
            returnValues[39] = userTotalRepliesReceivedOnTopicsLastYear- results.rowCount;
            returnValues[44] = userTotalViewsTopicsLastYear;
        })
        pool.query("SELECT like_count,reply_count,reads FROM public.posts WHERE user_id = " + userID,(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikePostsAllTime = 0;
            userTotalRepliesReceivedOnPostsAllTime = 0;
            userTotalViewsPostsAllTime = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikePostsAllTime = userTotalLikePostsAllTime + results.rows[i].like_count;
                userTotalRepliesReceivedOnPostsAllTime = userTotalRepliesReceivedOnPostsAllTime + results.rows[i].reply_count;
                userTotalViewsPostsAllTime = userTotalViewsPostsAllTime + results.rows[i].reads;
            }
            returnValues[45] = userTotalLikePostsAllTime;
            returnValues[50] = userTotalRepliesReceivedOnPostsAllTime;
            returnValues[55] = userTotalViewsPostsAllTime;
        })
        
        pool.query("SELECT like_count,reply_count,reads FROM public.posts WHERE user_id = " + userID+" and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesPostsLastWeek = 0;
            userTotalRepliesReceivedOnPostsLastWeek = 0;
            userTotalViewsPostsLastWeek = 0;
        
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesPostsLastWeek = userTotalLikesPostsLastWeek + results.rows[i].like_count;
                userTotalRepliesReceivedOnPostsLastWeek = userTotalRepliesReceivedOnPostsLastWeek + results.rows[i].reply_count;
                userTotalViewsPostsLastWeek = userTotalViewsPostsLastWeek + results.rows[i].reads;
            }
            returnValues[46] = userTotalLikesPostsLastWeek;
            returnValues[51] = userTotalRepliesReceivedOnPostsLastWeek;
            returnValues[56] = userTotalViewsPostsLastWeek;
        })
        pool.query("SELECT like_count,reply_count,reads FROM public.posts WHERE user_id = " + userID+" and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesPostsLastTwoWeek = 0;
            userTotalRepliesReceivedOnPostsTwoLastWeek = 0;
            userTotalViewsPostsLastTwoWeek = 0;
     
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesPostsLastTwoWeek = userTotalLikesPostsLastTwoWeek + results.rows[i].like_count;
                userTotalRepliesReceivedOnPostsTwoLastWeek = userTotalRepliesReceivedOnPostsTwoLastWeek + results.rows[i].reply_count;
                userTotalViewsPostsLastTwoWeek = userTotalViewsPostsLastTwoWeek + results.rows[i].reads;
            }
            returnValues[47] = userTotalLikesPostsLastTwoWeek;
            returnValues[52] = userTotalRepliesReceivedOnPostsTwoLastWeek;
            returnValues[57] = userTotalViewsPostsLastTwoWeek;
        })
        pool.query("SELECT like_count,reply_count,reads FROM public.posts WHERE user_id = " + userID+" and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesPostsLastMonth = 0;
            userTotalRepliesReceivedOnPostsLastMonth = 0;
            userTotalViewsPostsLastMonth = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesPostsLastMonth = userTotalLikesPostsLastMonth + results.rows[i].like_count;
                userTotalRepliesReceivedOnPostsLastMonth = userTotalRepliesReceivedOnPostsLastMonth + results.rows[i].reply_count;
                userTotalViewsPostsLastMonth = userTotalViewsPostsLastMonth + results.rows[i].reads;
            }
            returnValues[48] = userTotalLikesPostsLastMonth;
            returnValues[53] = userTotalRepliesReceivedOnPostsLastMonth;
            returnValues[58] = userTotalViewsPostsLastMonth;
        })
        pool.query("SELECT like_count,reply_count,reads FROM public.posts WHERE user_id = " + userID+" and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "'",(error,results)=>{
            if(error){
                reject(error)
            }
            userTotalLikesPostsLastYear = 0;
            userTotalRepliesReceivedOnPostsLastYear = 0;
            userTotalViewsPostsLastYear = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTotalLikesPostsLastYear = userTotalLikesPostsLastYear + results.rows[i].like_count;
                userTotalRepliesReceivedOnPostsLastYear = userTotalRepliesReceivedOnPostsLastYear + results.rows[i].reply_count;
                userTotalViewsPostsLastYear = userTotalViewsPostsLastYear + results.rows[i].reads;
            }
            returnValues[49] = userTotalLikesPostsLastYear;
            returnValues[54] = userTotalRepliesReceivedOnPostsLastYear;
            returnValues[59] = userTotalViewsPostsLastYear;
        })
        pool.query("SELECT * FROM public.topic_views WHERE user_id = " + userID,(error,result)=>{
            if(error){
                reject(error)
            }
            userTopicsViewedAllTime  = result.rowCount;
            returnValues[60]=userTopicsViewedAllTime ;
        })
        pool.query("SELECT * FROM public.topic_views WHERE user_id = " + userID+" and viewed_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTopicsViewedLastWeek = result.rowCount;
            returnValues[61]=userTopicsViewedLastWeek;
        })
        pool.query("SELECT * FROM public.topic_views WHERE user_id = " + userID+" and viewed_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTopicsViewedLast2Weeks = result.rowCount;
            returnValues[62]=userTopicsViewedLast2Weeks;
        })
        pool.query("SELECT * FROM public.topic_views WHERE user_id = " + userID+" and viewed_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTopicsViewedLastMonth = result.rowCount;
            returnValues[63]=userTopicsViewedLastMonth;
        })
        pool.query("SELECT * FROM public.topic_views WHERE user_id = " + userID+" and viewed_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "'",(error,result)=>{
            if(error){
                reject(error)
            }
            userTopicsViewedLastYear = result.rowCount;
            returnValues[64]=userTopicsViewedLastYear;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number = 1 and raw != '(topic deleted by author)'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicsLengthAllTime = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTopicsLengthAllTime = userTopicsLengthAllTime + results.rows[i].word_count;
            }
            returnValues[65] = userTopicsLengthAllTime;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number = 1 and raw != '(topic deleted by author)'  and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicsLengthLastWeek = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTopicsLengthLastWeek = userTopicsLengthLastWeek + results.rows[i].word_count;
            }
            returnValues[66] = userTopicsLengthLastWeek;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number = 1 and raw != '(topic deleted by author)'  and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicsLengthLast2Weeks = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTopicsLengthLast2Weeks = userTopicsLengthLast2Weeks + results.rows[i].word_count;
            }
            returnValues[67] = userTopicsLengthLast2Weeks;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number = 1 and raw != '(topic deleted by author)'  and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicsLengthLastMonth = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTopicsLengthLastMonth = userTopicsLengthLastMonth + results.rows[i].word_count;
            }
            returnValues[68] = userTopicsLengthLastMonth;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number = 1 and raw != '(topic deleted by author)' and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicsLengthLastYear = 0;
            for(let i = 0;i<results.rows.length;i++){
                userTopicsLengthLastYear = userTopicsLengthLastYear + results.rows[i].word_count;
            }
            returnValues[69] = userTopicsLengthLastYear;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number != 1 and raw != '(topic deleted by author)'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userPostsLengthAllTime = 0;
            for(let i = 0;i<results.rows.length;i++){
                userPostsLengthAllTime = userPostsLengthAllTime + results.rows[i].word_count;
            }
            returnValues[70] = userPostsLengthAllTime;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number != 1 and raw != '(topic deleted by author)'  and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userPostsLengthLastWeek = 0;
            for(let i = 0;i<results.rows.length;i++){
                userPostsLengthLastWeek = userPostsLengthLastWeek + results.rows[i].word_count;
            }
            returnValues[71] = userPostsLengthLastWeek;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number != 1 and raw != '(topic deleted by author)'  and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userPostsLengthLast2Weeks = 0;
            for(let i = 0;i<results.rows.length;i++){
                userPostsLengthLast2Weeks = userPostsLengthLast2Weeks + results.rows[i].word_count;
            }
            returnValues[72] = userPostsLengthLast2Weeks;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number != 1 and raw != '(topic deleted by author)'  and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userPostsLengthLastMonth = 0;
            for(let i = 0;i<results.rows.length;i++){
                userPostsLengthLastMonth = userPostsLengthLastMonth + results.rows[i].word_count;
            }
            returnValues[73] = userPostsLengthLastMonth;
        })
        pool.query("Select * from public.posts where user_id = "+userID+" and post_number != 1 and raw != '(topic deleted by author)' and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "'" ,(error,results)=>{
            if(error){
                reject(error)
            }
            userPostsLengthLastYear = 0;
            for(let i = 0;i<results.rows.length;i++){
                userPostsLengthLastYear = userPostsLengthLastYear + results.rows[i].word_count;
            }
            returnValues[74] = userPostsLengthLastYear;
        })
        pool.query("SELECT id,created_at,user_id FROM public.topics WHERE user_id = " + userID + " and archetype = 'regular' ORDER BY id",(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicAllTime24hours = 0;
            userTopicAllTime48hours = 0;
            userTopicAllTime72hours = 0;
            var tempforAllTimeWithin = 0;
            for(let i = 1;i<results.rowCount;i++){
                tempforAllTimeWithin = results.rows[i].created_at - results.rows[i-1].created_at
                if(tempforAllTimeWithin<=within24hrs){
                    userTopicAllTime24hours = userTopicAllTime24hours + 1
                }else if(tempforAllTimeWithin<=within48hrs){
                    userTopicAllTime48hours = userTopicAllTime48hours + 1
                }else if(tempforAllTimeWithin<=within72hrs){
                    userTopicAllTime72hours = userTopicAllTime72hours + 1
                }
            }
            returnValues[75] = userTopicAllTime24hours;
            returnValues[76] = userTopicAllTime48hours;
            returnValues[77] = userTopicAllTime72hours;
        })
        pool.query("SELECT id,created_at,user_id FROM public.topics WHERE user_id = " + userID + " and archetype = 'regular' and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate + "' ORDER BY id ",(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicWeek24hours = 0;
            userTopicWeek48hours = 0;
            userTopicWeek72hours = 0;
            var tempforWeekWithin = 0;
            for(let i = 1;i<results.rowCount;i++){
                tempforWeekWithin = results.rows[i].created_at - results.rows[i-1].created_at
                if(tempforWeekWithin<=within24hrs){
                    userTopicWeek24hours = userTopicWeek24hours + 1
                }else if(tempforWeekWithin<=within48hrs){
                    userTopicWeek48hours = userTopicWeek48hours + 1
                }else if(tempforWeekWithin<=within72hrs){
                    userTopicWeek72hours = userTopicWeek72hours + 1
                }
            }
            returnValues[78] = userTopicWeek24hours;
            returnValues[79] = userTopicWeek48hours;
            returnValues[80] = userTopicWeek72hours;
        })
        pool.query("SELECT id,created_at,user_id FROM public.topics WHERE user_id = " + userID + " and archetype = 'regular' and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo + "' ORDER BY id ",(error,results)=>{
            if(error){
                reject(error)
            }
            userTopic2Weeks24hours = 0;
            userTopic2Weeks48hours = 0;
            userTopic2Weeks72hours = 0;
            var tempfor2WeekWithin = 0;
            for(let i = 1;i<results.rowCount;i++){
                tempfor2WeekWithin = results.rows[i].created_at - results.rows[i-1].created_at
                if(tempfor2WeekWithin<=within24hrs){
                    userTopic2Weeks24hours = userTopic2Weeks24hours + 1
                }else if(tempfor2WeekWithin<=within48hrs){
                    userTopic2Weeks48hours = userTopic2Weeks48hours + 1
                }else if(tempfor2WeekWithin<=within72hrs){
                    userTopic2Weeks72hours = userTopic2Weeks72hours + 1
                }
            }
            returnValues[81] = userTopic2Weeks24hours;
            returnValues[82] = userTopic2Weeks48hours;
            returnValues[83] = userTopic2Weeks72hours;
        })
        pool.query("SELECT id,created_at,user_id FROM public.topics WHERE user_id = " + userID + " and archetype = 'regular' and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate + "' ORDER BY id ",(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicMonth24hours = 0;
            userTopicMonth48hours = 0;
            userTopicMonth72hours = 0;
            var tempforMonthWithin = 0;
            for(let i = 1;i<results.rowCount;i++){
                tempforMonthWithin = results.rows[i].created_at - results.rows[i-1].created_at
                if(tempforMonthWithin<=within24hrs){
                    userTopicMonth24hours = userTopicMonth24hours + 1
                }else if(tempforMonthWithin<=within48hrs){
                    userTopicMonth48hours = userTopicMonth48hours + 1
                }else if(tempforMonthWithin<=within72hrs){
                    userTopicMonth72hours = userTopicMonth72hours + 1
                }
            }
            returnValues[84] = userTopicMonth24hours;
            returnValues[85] = userTopicMonth48hours;
            returnValues[86] = userTopicMonth72hours;
        })
        pool.query("SELECT id,created_at,user_id FROM public.topics WHERE user_id = " + userID + " and archetype = 'regular' and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate + "' ORDER BY id ",(error,results)=>{
            if(error){
                reject(error)
            }
            userTopicYear24hours = 0;
            userTopicYear48hours = 0;
            userTopicYear72hours = 0;
            var tempforYearWithin = 0;
            for(let i = 1;i<results.rowCount;i++){
                tempforYearWithin = results.rows[i].created_at - results.rows[i-1].created_at
                if(tempforYearWithin<=within24hrs){
                    userTopicYear24hours = userTopicYear24hours + 1
                }else if(tempforYearWithin<=within48hrs){
                    userTopicYear48hours = userTopicYear48hours + 1
                }else if(tempforYearWithin<=within72hrs){
                    userTopicYear72hours = userTopicYear72hours + 1
                }
            }
            returnValues[87] = userTopicYear24hours;
            returnValues[88] = userTopicYear48hours;
            returnValues[89] = userTopicYear72hours;
        })
        pool.query("Select * from public.poll_votes Where user_id = " + userID,(error,results)=>{
            if(error){
                reject(error)
            }
            userPollVotesAllTime = results.rowCount;
            returnValues[90] = userPollVotesAllTime;
        })
        pool.query("Select * from public.poll_votes Where user_id = " + userID+ " and created_at between '" + queryWeekAgo + "' and '" + queryCurrentDate+"'",(error,results)=>{
            if(error){
                reject(error)
            }
            userPollVotesWeekAgo = results.rowCount;
            returnValues[91] = userPollVotesWeekAgo;
        })
        pool.query("Select * from public.poll_votes Where user_id = " + userID+ " and created_at between '" + query2WeeksAgo + "' and '" + queryWeekAgo+"'",(error,results)=>{
            if(error){
                reject(error)
            }
            userPollVotes2WeeksAgo = results.rowCount;
            returnValues[92] = userPollVotes2WeeksAgo;
        })
        pool.query("Select * from public.poll_votes Where user_id = " + userID+ " and created_at between '" + queryMonthAgo + "' and '" + queryCurrentDate+"'",(error,results)=>{
            if(error){
                reject(error)
            }
            userPollVotesMonthAgo = results.rowCount;
            returnValues[93] = userPollVotesMonthAgo;
        })
        pool.query("Select * from public.poll_votes Where user_id = " + userID+ " and created_at between '" + queryYearAgo + "' and '" + queryCurrentDate+"'",(error,results)=>{
            if(error){
                reject(error)
            }
            userPollVotesYearAgo = results.rowCount;
            returnValues[94] = userPollVotesYearAgo;
        }) 

        resolve(returnValues);        
    })
}

//The allQueries function will run which fetch the data and store on the returnValues array 
//and information will be exported to localhost:3011 page
module.exports = {
    allQueries
}