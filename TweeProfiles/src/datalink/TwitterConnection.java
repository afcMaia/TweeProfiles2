package datalink;

import java.sql.SQLException;

import twitter4j.PagableResponseList;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.User;
import twitter4j.auth.AccessToken;
import twitter4j.conf.ConfigurationBuilder;


public class TwitterConnection {
	
	//TODO bypass oauth callback url
	
	 	static String TWITTER_CONSUMER_KEY = "Z0iSkhXNI4ZtKOO83qkvPqkSq";
	    static String TWITTER_CONSUMER_SECRET = "XfN5YgFGQUPkYXrX83GaTmjfTrex0exFinbf1lSppdyEoo5TMc";
	 
	    static String ACCESS_TOKEN = "2528967104-oqRmJORLz8m0A9nUQiN1TZo9QENzEA8UivETFwc";
	    static String ACCESS_TOKEN_SECRET = "wGRfCUdRHXsFGkR1h1NfzNigTSB2zG6BlUh0eazCzD7xH";
	    
	    Twitter twitter;
	    AccessToken accessToken;
	    MySQLConnection mysql;
	    
	    public TwitterConnection(){
	    }
	    
	    public void setup() {
	    	ConfigurationBuilder cb = new ConfigurationBuilder();
	    	cb.setDebugEnabled(true)
	    	  .setOAuthConsumerKey("TWITTER_CONSUMER_KEY")
	    	  .setOAuthConsumerSecret("TWITTER_CONSUMER_SECRET")
	    	  .setOAuthAccessToken("ACCESS_TOKEN")
	    	  .setOAuthAccessTokenSecret("ACCESS_TOKEN_SECRET");
	    	TwitterFactory tf = new TwitterFactory(cb.build());
	    	twitter = tf.getInstance();
	    	try {
				System.out.println(twitter.verifyCredentials());
			} catch (TwitterException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	//mysql = new MySQLConnection();
		    //mysql.setup();
	    }
	    
	    public void getFollowers(String screenname) throws TwitterException{
	    	long nextCursor = -1;
	    	do{
		    	PagableResponseList<User> followersList = twitter.friendsFollowers().getFollowersList(screenname, nextCursor);
		    	for (User u : followersList){
		    		String follower = u.getScreenName();
		    		String line = screenname+","+follower;
		    		System.out.println(line);
		    	}	
		    	nextCursor = followersList.getNextCursor();
	    	}
	    	while(nextCursor>0);
	    }
	    
	    public void close() {
	    	//mysql.close();
	    }
	    
	    
}
