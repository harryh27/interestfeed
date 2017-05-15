'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
	id: Number,
	id_str: String,
	name: String,
	screen_name: String,
	location: String,
	description: String,
	url: String,
	followers_count: Number,
	friends_count: Number,
	favourites_count: Number,
	verified: Boolean,
	profile_image_url: String,
	following: Boolean
},{ _id : false });

var EntitiesSchema = new mongoose.Schema({
	urls: [{
	  url: String,
	  expanded_url: String,
	  display_url : String,
	  final_url : String,
	  indices: Array,
	}],
	hashtags: [{
	  text: String,
	  indices: Array
	}],
	user_mentions: [{
	  screen_name: String,
	  name: String,
	  id: Number,
	  indices: Array
	}]	
},{ _id : false });

var RetweetedStatusSchema = new mongoose.Schema({	
  created_at: Date,
  id: { type: Number},
  id_str: { type: String},
  text: String,
  truncated: Boolean,
  user: UserSchema, 
  retweet_count: Number,
  favorite_count: Number,
  entities: EntitiesSchema,
  favorited: Boolean,
  retweeted: Boolean,
  has_links : { type: Boolean, default: false },
  is_new : { type: Boolean, default: false },
  lang: String,
},{ _id : false });

var RetweetFavoriteTimeLineSchema = new mongoose.Schema({
  date_updated: Date,
  retweet_count: Number,
  favorite_count: Number,
},{ _id : false });

var StatusSchema = new mongoose.Schema({	
  created_at: Date,
  id: { type: Number},
  id_str: { type: String},
  text: String,
  truncated: Boolean,
  user: UserSchema, 
  retweeted_status: RetweetedStatusSchema,
  retweet_count: Number,
  favorite_count: Number,
  entities: EntitiesSchema,
  favorited: Boolean,
  retweeted: Boolean,
  has_links : { type: Boolean, default: false },
  is_new : { type: Boolean, default: false },
  lang: String,
  timestamp_ms: String,
  retweetFavoriteTimeLine : [RetweetFavoriteTimeLineSchema],
  items: [{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Item'
	}],
  processingStage: { type: Number, default: 0 },	
});

StatusSchema.index({"id_str": 1}, {unique: true});
StatusSchema.index({"created_at": 1});
StatusSchema.index({"timestamp_ms": 1});
StatusSchema.index({"text": 1, "user.id_str": 1});
StatusSchema.index({"processingStage": 1, "text": 1, "entities.urls.expanded_url": 1, "entities.urls.display_url": 1 , "entities.hashtags.text": 1});

export default mongoose.model('Status', StatusSchema);
