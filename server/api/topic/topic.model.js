'use strict';

import mongoose from 'mongoose';

var FingerprintSchema = new mongoose.Schema({
	positions: [{
		  type : Number,
		  index: true
	}]
},{ _id : false });	

var SlicesSchema = new mongoose.Schema({
	text: { 
		type: String,
		default: '',
		trim: true
	},
	fingerprint: FingerprintSchema
},{ _id : false });

var SemanticSchema = new mongoose.Schema({
	semantic_fingerprint: FingerprintSchema,
	semantic_slices: [SlicesSchema],
},{ _id : false });

var ImageSchema = new mongoose.Schema({	
    url: String,
	file: String,
	thumb: String,
},{ _id : false });

var TextSchema = new mongoose.Schema({	
    intro: { content_stripped: String, word_count: Number },
	complete: { 
				content_stripped: String, 
				word_count: Number, 
				semantic : SemanticSchema,
			},
},{ _id : false }); 
  
var TopicSchema = new mongoose.Schema({	
    title: String,
	wikipediaUrl: String,
	images: [ImageSchema],
	tweetsByText: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        }],
	tweetsBySemantic: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        }],	
	categories: [String],
	text : TextSchema,
	streamAPILevel: { type: Number, default: 0 },
	lastUpdated: { type: Date, default: Date.now },
	processingStage: { type: Number, default: 0 },
});

TopicSchema.index({"title": 1}, {unique: true});
TopicSchema.index({"title": 1, "streamAPILevel": 1});
TopicSchema.index({"_id": 1, "tweetsByText._id": 1}, {unique: true});
TopicSchema.index({"_id": 1, "tweetsBySemantic._id": 1}, {unique: true});
TopicSchema.index({"title": 1, "tweets.retweet_count": -1}, {});
TopicSchema.index({"categories": 1});
TopicSchema.index({"streamAPILevel": 1});
TopicSchema.index({"lastUpdated": 1});
TopicSchema.index({"processingStage": 1});

export default mongoose.model('Topic', TopicSchema);
