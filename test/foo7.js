var ContentReward = artifacts.require("ContentReward");

var json_data = require("./foo0.json");
var json_data_1 = require("./foo7.json");

contract('ContentReward TEST foo7', function() {
  var owner = web3.eth.accounts[0];
  var content_act = json_data['contents'];
  var user_reputation = json_data['reputations'];
  var result = json_data['result'];
  var user_address = {};
  var flagLocation = 0;
  var timestamp;
  var content_act_1 = json_data_1['contents'];
  var user_reputation_1 = json_data_1['reputations'];
  var result_1 = json_data_1['result'];


  before(function() {
    for (let foo_user in user_reputation) {
      user_address[foo_user] = web3.personal.newAccount('11114444');
    }
    for (let foo_user in user_reputation_1) {
      user_address[foo_user] = web3.personal.newAccount('11114444');
    }
  });

  after(function() {});

  beforeEach(function() {
    timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
  });

  it("0. basic part", async() => {
    const cr = await ContentReward.deployed();
    // set year ttc
    await cr.setTotalTTCOneYear(result['ttc_num'] * 365 * 10 ** 18);
    // send 15 ttc to contract
    await cr.sendTransaction({from: web3.eth.accounts[7], to: cr.address, value: 15*10**18});
    // pubslish content
    for (let foo_content_id in content_act) {
      foo_content_creator = content_act[foo_content_id]['content_creator'];
      foo_comments = content_act[foo_content_id]['comments'];
      foo_likes = content_act[foo_content_id]['likes'];
      foo_shares = content_act[foo_content_id]['shares'];
      foo_address = user_address[foo_content_creator];
      await cr.publishContent(foo_content_id, timestamp, foo_content_creator, foo_address);
      // publish comment
      for (let foo_comment_id in foo_comments) {
        let foo_comment_creator = foo_comments[foo_comment_id]['comment_creator'];
        let foo_comment_likes = foo_comments[foo_comment_id]['comment_likes'];
        let foo_address = user_address[foo_comment_creator];
        let foo_reputation = user_reputation[foo_comment_creator];
        await cr.commentContent(foo_content_id, foo_comment_creator, foo_address, foo_comment_id, timestamp, foo_reputation, false, "");
        // publish favor under comment
        for (let foo_cl of foo_comment_likes) {
          foo_like_creator = foo_cl['like_creator'];
          await cr.commentContent(foo_content_id, foo_comment_creator, foo_address, foo_comment_id, timestamp, foo_reputation, true, foo_like_creator);
        }
      }
      // publish favor
      for (let foo_like of foo_likes) {
        let foo_like_creator = foo_like['like_creator'];
        let foo_address = user_address[foo_like_creator];
        let foo_reputation = user_reputation[foo_like_creator];
        await cr.likeContent(foo_content_id, foo_like_creator, foo_address, timestamp, foo_reputation);
      }
      // share
      for (let foo_share_creator of foo_shares) {
        foo_address = user_address[foo_share_creator];
        foo_reputation = user_reputation[foo_share_creator];
        await cr.shareContent(foo_content_id, foo_share_creator, foo_address, timestamp, foo_reputation);
      }
      // calculate value
      const foo_content = await cr.contentsDetail.call(foo_content_id);
      foo_content_value = result[foo_content_id]['content'];
      // comment value
      foo_comment_value = result[foo_content_id]['comment'];
      // console.log(foo_content_id + ": " + foo_content[1]);
      assert.equal(foo_content[1], foo_comment_value, "equal");
      // like value
      foo_like_value = result[foo_content_id]['like'];
      // console.log(foo_content_id + ": " + foo_content[0]);
      assert.equal(foo_content[0], foo_like_value, "equal");
      // share value
      foo_share_value = result[foo_content_id]['share'];
      // console.log(foo_content_id + ": " + foo_content[2]);
      assert.equal(foo_content[2], foo_share_value, "equal");
    }
  });

  it.skip("5. publish content", async() => {
    const cr = await ContentReward.deployed();
    for (let foo_content_id in content_act_1) {
      foo_ct = content_act_1[foo_content_id]
      foo_content_creator = foo_ct['content_creator'];
      foo_comments = foo_ct['comments'];
      foo_likes = foo_ct['likes'];
      foo_shares = foo_ct['shares'];
      foo_address = user_address[foo_content_creator];
      await cr.publishContent(foo_content_id, timestamp, foo_content_creator, foo_address);
      // publish comment
      for (let foo_comment_id in foo_comments) {
        let foo_comment_creator = foo_comments[foo_comment_id]['comment_creator'];
        let foo_comment_likes = foo_comments[foo_comment_id]['comment_likes'];
        let foo_address = user_address[foo_comment_creator];
        let foo_reputation = user_reputation_1[foo_comment_creator];
        await cr.commentContent(foo_content_id, foo_comment_creator, foo_address, foo_comment_id, timestamp, foo_reputation, false, "");
        // publish favor under comment
        for (let foo_cl of foo_comment_likes) {
          foo_like_creator = foo_cl['like_creator'];
          await cr.commentContent(foo_content_id, foo_comment_creator, foo_address, foo_comment_id, timestamp, foo_reputation, true, foo_like_creator);
        }
      }
      // publish favor
      for (let foo_like of foo_likes) {
        let foo_like_creator = foo_like['like_creator'];
        let foo_address = user_address[foo_like_creator];
        let foo_reputation = user_reputation_1[foo_like_creator];
        await cr.likeContent(foo_content_id, foo_like_creator, foo_address, timestamp, foo_reputation);
      }
      // share
      for (let foo_share_creator of foo_shares) {
        foo_address = user_address[foo_share_creator];
        foo_reputation = user_reputation_1[foo_share_creator];
        await cr.shareContent(foo_content_id, foo_share_creator, foo_address, timestamp, foo_reputation);
      }
      // calculate value
      const foo_content = await cr.contentsDetail.call(foo_content_id);
      foo_content_value = result_1[foo_content_id]['content'];
      // comment value
      foo_comment_value = result_1[foo_content_id]['comment'];
      // console.log(foo_content_id + ": " + foo_content[1]);
      assert.equal(foo_content[1], foo_comment_value, "equal");
      // like value
      foo_like_value = result_1[foo_content_id]['like'];
      // console.log(foo_content_id + ": " + foo_content[0]);
      assert.equal(foo_content[0], foo_like_value, "equal");
      // share value
      foo_share_value = result_1[foo_content_id]['share'];
      // console.log(foo_content_id + ": " + foo_content[2]);
      assert.equal(foo_content[2], foo_share_value, "equal");
    }
  });

  it.skip("10. delete favor against comment", async() => {
    const cr = await ContentReward.deployed();
    // delete favor against comment
    for (let foo_content_id in content_act_1) {
      foo_ct = content_act_1[foo_content_id]
      foo_comments = foo_ct['comments'];
      for (let foo_comment_id in foo_comments) {
        let foo_comment_creator = foo_comments[foo_comment_id]['comment_creator'];
        let foo_comment_likes = foo_comments[foo_comment_id]['comment_likes'];
        let foo_address = user_address[foo_comment_creator];
        let foo_reputation = user_reputation_1[foo_comment_creator];
        for (let foo_cl of foo_comment_likes) {
          if (foo_cl['delete']) {
            // TODO: there is no function for deleting like against comment
          }
        }
      }
      // calculate value
      const foo_content = await cr.contentsDetail.call(foo_content_id);
      foo_content_value = result_1[foo_content_id]['content'];
      // comment value
      foo_comment_value = result_1[foo_content_id]['comment'];
      // console.log(foo_content_id + ": " + foo_content[1]);
      assert.equal(foo_content[1], foo_comment_value, "equal");
      // like value
      foo_like_value = result_1[foo_content_id]['like'];
      // console.log(foo_content_id + ": " + foo_content[0]);
      assert.equal(foo_content[0], foo_like_value, "equal");
      // share value
      foo_share_value = result_1[foo_content_id]['share'];
      // console.log(foo_content_id + ": " + foo_content[2]);
      assert.equal(foo_content[2], foo_share_value, "equal");
    }
    // calculate each content ttc value
    const foo_daily_contents = await cr.getDailyContents(parseInt(timestamp/86400));
    await cr.calTTCValueOfDailyContent(timestamp, 0, foo_daily_contents.length);
    for (let foo_content_id in content_act) {
      const foo_content_1 = await cr.contentsDetail.call(foo_content_id);
      // send ttc to content creator
      await cr.sendTTCToCreatorByContentId(parseInt(foo_content_id));
      // send ttc to comment creator
      await cr.sendTTCToCommentUser(foo_content_id, 0, 100);
      // send ttc to like creator
      await cr.sendTTCToLikeUser(foo_content_id, 0, 100);
    }
    for (let foo_content_id in content_act_1) {
      const foo_content_1 = await cr.contentsDetail.call(foo_content_id);
      try {
        // send ttc to content creator
        await cr.sendTTCToCreatorByContentId(parseInt(foo_content_id));
        // send ttc to comment creator
        await cr.sendTTCToCommentUser(foo_content_id, 0, 100);
        // send ttc to like creator
        await cr.sendTTCToLikeUser(foo_content_id, 0, 100);
      } catch (err) {
        console.log(err);
      }
    }
    // verify
    for (let foo_user_id in user_address) {
      let foo_address = user_address[foo_user_id];
      let foo_ttc_value = web3.eth.getBalance(foo_address);
      foo_ttc_value = parseInt(foo_ttc_value / (10**14)) / 100;
      // console.log(foo_user_id + ": " + foo_ttc_value);
      ttc_expected = result_1['ttc'];
      assert.equal(foo_ttc_value, ttc_expected[foo_user_id], "equal");
    }
  });

});
