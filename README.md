flow-router-pagination
======================
A simple pagination package for flow-router.

Forked from miguelalarcos/flow-router-pagination. Converted from coffeescript and tweaked.

Explanation
-----------
Add a pagination widget is as simple as:

```html
{{> paginationBar itemsPerPage=3 window=5 count='total_posts'}}
```

where window is the number of pages shown in the pagination bar.
You need to add the package [tmeasday:publish-counts](https://atmospherejs.com/tmeasday/publish-counts).

Then in your server:
```coffee
Meteor.publish 'postsWithSkip', (skip, limit) ->
  Counts.publish(this, 'total_posts', posts.find())
  if skip < 0 then skip = 0
  options = {}
  options.skip = skip
  options.limit = limit
  if options.limit > 10 then options.limit = 10
  options.sort = {createdAt: 1}
  posts.find({}, options)
```

in your router:
```coffee
FlowRouter.route '/',
  name: 'home'
  subscriptions: (params, queryParams) ->
    page = parseInt(queryParams.page) or 0
    limit = 3
    offset = page*limit
    this.register('postsWithSkip', Meteor.subscribe('postsWithSkip', offset, limit))
  action: (params, queryParams) ->
    FlowLayout.render 'mainLayout', {top: 'header', main: 'home'}
```

and the *less* file to style, for example:
```less
@import "buttons.less";

.minus-button {
  .box(red);
}

.plus-button {
  .box(green);
}

.page-button {
  .box(blue);
}
```

If you don't want to harcode the *limit* var in every place it's used, you can define it inside ```client/lib``` folder:

```coffee
@limit = 3
```
