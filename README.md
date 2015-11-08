# Easy Box Model (EBM)

## Getting started

- `git clone https://github.com/EasyBoxModel/EBM.git name_of_your_project`
- Mac users: `sudo npm install` - Windows users: `npm install`
- `grunt`

That's it. Start coding in the `app/index.html` file and style it on the `src/scss/EBM/_ebm-global.scss` file. Grunt will live-reload any changes on a localhost:9000 server. 

See [available branches](https://github.com/EasyBoxModel/EBM/tree/master#available-branches) for more info about how the EBM is updated.

## Description

The EBM is a structured set of frontend libraries and tools and a workflow proposal on how to use them to drastically increase web development productivity.

### Thoughts about time

After having worked on at least 20 web projects throughout 18 months, we discovered that __time tracking does not objectively measure productivity__, instead, we prefer talking about __time efficiency__, where the ammount of time taken to complete a project in the stages of development, Q&A and production can be decreased if each individual inside the development team uses __productivity resources__.

### Productivity resources

So, if time tracking does not objectively measure development productivity: __How can we make sure that at least, we are taking less time on completing tasks and completing them well?__


### Taking less time on completing tasks

__Habits__. Development habits are systematic steps that individuals take to complete the given tasks. 

Even the simplest tasks, add up to the overall development time of the project

Here is a list of how the EBM proposes to work on these habits:

- Naming conventions in files, selectors and elements
- Text editor shortcuts and tools
- Browser shortcuts and tools
- Computer shortcuts and tools
- Size units value references
- Command line aliases
- Troubleshooting techniques
- Aknowledgement of the available resources
- Health and comfort considerations


### Less time, but without compromising the product quality

Can we get a balance between time and quality? 

Can we accomplish it on large teams? 

What does quality mean?

- Accessibility
- Performance
- Readibility
- Compatibility
- Scalability
- Functionality

## EBM aims to:

- Create __workflow consistency__ for frontend development teams
- Define a standard set of development tools to __ensure product quality__
- Help developers on building their __time efficiency habits__
- Help on the __development team communication__ process by specifying naming conventions and project structure
- Document and __automate__ processes
- Output light CSS files for its use in CMS's and __scalable web applications__
- Help frontend development teams to __think in the Sass way__

### EBM expected outputs

- Satisfy the customer through __early and continuous delivery of valuable software__
- __Welcome changing requirements__, even late in development. Agile processes harness change for the customer’s competitive advantage
- __Deliver working software frequently__, from a couple of weeks to a couple of months, with a preference to the shorter timescale
- __Working software is the primary measure of progress__
- __Sustainable development__. The sponsors, developers, and users should be able to maintain a constant pace indefinitely
- Continuous __attention to technical excellence and good design__ enhances agility
- __Simplicity__
- Self-organizing teams
- At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly


## EBM structure

- [Setup](http://easyboxmodel.com/category/getting-started)
- [Sass utilities](http://easyboxmodel.com/category/utilities)
- HTML utilities - docs in progress
- JavaScript utilities - docs in progress
- Productivity resources - docs in progress

## Available branches

EBM is 1.3mb for the `master` branch. However, you can clone any of these other branches: 

### Sass utilities only
This branch is where the updates to the `src/scss/` are made:

`git clone -b sass-utilities https://github.com/EasyBoxModel/EBM.git name_of_your_project`

### HTML utilities + Sass utilities
Clone the EBM with the HTML utilities 

`git clone -b html-utilities https://github.com/EasyBoxModel/EBM.git name_of_your_project`

### Wordpress theme boilerplate
Clone the EBM wordpress theme boilerplate into your `wp-content/themes/` which comes with setup files such as `functions.php`, `index.php`, `screenshot.png`, `header.php`, `footer.php` and `style.css` right away. 

If your WP project already has a working `.git` folder, read more about `git subtree`

`git clone -b wordpress-boilerplate https://github.com/EasyBoxModel/EBM.git name_of_your_project`

### Experimental
Clone the EBM plus experimental Sass partials and HTML5 new tag attributes and other Grunt tasks still on development

`git clone -b experimental https://github.com/EasyBoxModel/EBM.git name_of_your_project`

## How to contribute

As previously stated, the EBM is a proposal on how to use the selected libraries and tools, it was born as an always-evolving structure and methodology so it's on its nature to be like that. 

There are 3 ways to contribute:

1. Extending and optimizing the main files: `src/` and `app/`. Meaning that contributors may create new files for the HTML, Sass and JavaScript utilities or suggest new class, mixins or function names so every benefits from it.
2. Extending and optimizing the documentation. The docs site is a Wordpress theme for practical, distribution and structural reasons, however, there's a [documentation repo issues](https://github.com/EasyBoxModel/EBM.Docs/issues) where typos, semantic, syntactic, grammatical or extension issues can be submitted.
3. The EBM focuses on front-end development for now and its proposal has been tested in front-end development teams, however, it is one of the EBM aims to contribute on the collaboration and communication among the entire development team, meaning back-end and front-end. If you feel comfortable with project-management topics and practices that may add-up to the time-efficiency  principles and productivity resources, you are more than welcome as a collaborator. 


## Changelog