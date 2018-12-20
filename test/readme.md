### How to run
 `$ truffle test`
### CASE
#### Content Reward
1. base situation
 - here are three contents, all kinds of actions are done on these contents, and nobody execute more than one action.
 - we can get TTC count which send to each person.
2. publish and delete content
 - publish a new content with actions, and then, delete it.
 - we expect that there is no change on total contents value, and each person get same ttc as case 1.
3. delete comment
 - publish a new content with two comments, and then, delete the first comment.
 - we assume another scenario, publish a new content with the second comment.
 - we expect that the person can get same number of ttc between the two scenarios.
4. delete favor
 - similar with case 3.
5. publish comment to one's own content
 - publish a new content with one comment, comment author is not the one who publishes the content.
 - second, the content author publish a comment to his own content.
 - we expect that step 2 gets no effect.
6. publish favor to one's own content
 - similar with case 5.
7. someone publish more than one comments to the same content
 - publish a new content with two comment.
 - second comment author publishes another comment.
 - we expect that step 2 gets no effect.
8. delete favor against comment
 - publish a new content with two comment, each comment has two favor.
 - delete two favor under the first comment.
9. delete comment till 0
 - publish a new content with one comment and one content favor.
 - delete the comment.
10. delete content favor till 0
 - similar with case 9.
11. publish favor under comment
 - publish a new content with two comments.
 - publish favor under the first comment.

#### Reputation Reward
1. login value test
2. follow value test
3. report value test
4. judge value test
