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
	keywords:[String]
},{ _id : false });

var PageLinkSchema = new mongoose.Schema({
	text: String, 
	href: String
},{ _id : false });	

var PageExtractSchema = new mongoose.Schema({
	title: String,
	softTitle: String,
	date: String,
	copyright: String,
	author: String,
	publisher: String,
	text: String,
	content_stripped: String,
	word_count: Number,
	image: String,
	canonicalLink: String,
	lang: String,
	description: String,
	favicon: String,
	links : [PageLinkSchema]
},{ _id : false });

 var ItemSchema = new mongoose.Schema({
	urls: {type: [String], required: true},
	expanded_urls: {type: [String], required: true},
	final_urls : {type: [String], required: true},
	display_urls : {type: [String], required: true},
	canonical_urls : {type: [String], required: true},
	page_title: String,
	page_extract: PageExtractSchema,
	semantic : SemanticSchema,
	statuses: [{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Status'
	}],
	statusCount: { type: Number, default: 0 },
	highestStatusRetweetCount: { type: Number, default: 0 },
	highestStatusLikeCount: { type: Number, default: 0 },
	highestTweeterFollowersCount: { type: Number, default: 0 },
	processingStage: { type: Number, default: 0 },
});

ItemSchema.index({"urls": 1});
ItemSchema.index({"expanded_urls": 1});
ItemSchema.index({"final_urls": 1});
ItemSchema.index({"display_urls": 1});
ItemSchema.index({"canonical_urls": 1});
ItemSchema.index({"semantic.semantic_fingerprint.positions": 1});
ItemSchema.index({"semantic.semantic_slices.fingerprint.positions": 1});
ItemSchema.index({"semantic.keywords": 1});
ItemSchema.index({"statuses": 1});
ItemSchema.index({"processingStage": 1, "page_extract.word_count":1, "statusCount": 1});
ItemSchema.index({"processingStage": 1, "page_extract.word_count":1, "highestTweeterFollowersCount":1, "highestStatusRetweetCount":1, "highestStatusLikeCount":1});

export default mongoose.model('Item', ItemSchema);
