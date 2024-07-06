---
toc: true
comments: true
layout: post
title: Team Seed
author: Rachit Jaiswal 
permalink: /team-seed
---

## Ideation, Planning
Our Ideation, Planning, and Integration have been captured in multiple issues, with progress being made as our team works through our project, and as we interact with different aspects, requirements, ideas, and finally new team members. Our planning has mostly stayed the same for our project, as the GAVE group that we have merged with have a project - not to mention the design of the Codemaxxer Rift project - allow a relatively easy merge of projects. 

### Merging Plan

#### GAVE

- Password game 
- Email phishing attack game 
- Vulnerability info table filtered by operating system + search bar
- Leaderboard for each game: gets user ID & fastest session time 

#### Codemaxxers

- Sign up and log in page 
- Dashboard: account points, CSA, CSP
- Profile: Email, Name, Password, Profile Picture 
- Character: Health/damage points, armor, weapons 
- Single player and multiplayer 
- Game: Walk around, talk to characters, battle enemy with CS knowledge 

#### Future thinking

- Purpose: Test students' general knowledge on coding & prep them for AP-exam 
- Island Topics: CSA (java, aws, deep dive into classes and OOP), CSP (python, javascript,  theory)
- Within each island:
Characters --> Guide through tutorial, trainers?
Battling --> Types of Questions: AP Exam prep, Theory, Basics of Lang
Puzzles --> unlock different territories with cyber locks (password game, phishing attack game, etc) 

### Team Manifesto
1. We will work together and will come to a consensus if there is an issue 
2. We will keep each other accountable 
3. When issues arise and they are at a standstill, scrum in respective groups will deal with it. If not resolved, group scrum masters will report to head scrum master. 
4. Team members will be held accountable for their work... if work is not done and people are unresponsive, then work will be shifted and absence will be reported to head scrum, which may be communicated to Mr. Mortensen.
5. We will ensure that everyone is included in the project and can contribute in some way. If someone needs help, we will do our best to work through problems together.

### Triangles

**Period 1:**
- Theo, Finn, Emma, Grace

**Period 2:**
- Rachit, Tanisha, Luna
- Aliya, Vivian, Justin, Shivansh

### Resources and Logs
[Manifesto](https://github.com/Codemaxxers/Issues/issues/44)
[Merging Plan](https://github.com/Codemaxxers/Issues/issues/45)
[Original Merging Plan](https://github.com/Codemaxxers/Issues/issues/42)
[VERY FIRST project idea](https://github.com/Codemaxxers/Issues/issues/1)
* scrolling through issues will reveal changes in our project plan. [Issues](https://github.com/Codemaxxers/Issues/issues)

## Test, Retrospective
Our team makes sure to help plan people for the AP Test, while also reviewing important programming concepts. We work together for teaching and integration, alternating sub-teams to teach and others to focus on integration, and then explaining and teaching to each of the teams what we did and how it works. 

## Coding, Code Review
Our code review comes from rulesets put into place to prevent harmful code changes. Each person needs someone else to reivew and approve their changes before a change is merged into the master branch. We also have an automatic github workflow that pulls in commits from the main branch every time it is updated into all other branches if there are no merge errors, making sure our codebase on our other branches is up to date (this is why we use branches instead of forks). 

Here is a picture of our approval method:
![Approval Method](https://rackets-assets.vercel.app/assets/tri3seed/approval_pull_requests.png)

Here is a picture of our automatic workflow:
![Auto Workflow](https://rackets-assets.vercel.app/assets/tri3seed/branchworkflow.png)

## Teacher/Customer input
At N@TM2, we got a lot of input from our customers. Many of them wanted to play with different keys, so we looked into which keyboard option was the most preferable for the game. Others also thought that the styling - such as sprite styles and image styles - were too different from each other, and we needed to make them have a similar art style. We have already reflected this change in our website, making everything pixelated. 

Our teacher, Mr. Mortensen, gave us some input on what we need to do to meet a lot of PBL requirements and structure our project well. Through his advice, we were able to incorporate a lot of lessons from collegeboard and make our project more efficient at the same time. 

## Team progress
Our team has made a lot of progress over the last 6-8 weeks. The Codemaxxer team has gotten more comfortable working together, and we don't really forsee any problems with team dynamics. We already know each other extremely well, including the GAVE group, which are people we all know and love to work with. We also have experience working with groups in both periods, and we already have a system of baby-scrums and head scrum communication. We already know what everyone would like to do and how they do it, as we have asked and checked with everyone in our group.

![Team Organization Diagram](https://rackets-assets.vercel.app/assets/tri3seed/codemaxxersgrouporganization1.png)

All scrums report to the head scrum, who's job in addition to their other jobs is to brief the team on incoming tasks and their ideas on how to tackle them, talk and set up meetings with the teams, resolve disputes, and communicate with everyone, including the teacher, while maintaining a vision and timeline for the success of the project.

![organization](https://rackets-assets.vercel.app/assets/tri3seed/codemaxxersgrouporganization1.png)

*For this project, the head scrum, chosen and agreed upon by everyone, is Rachit Jaiswal.*


## Fosters participation

Our team has a unique approach to participation. Many people in CSA may be difficult to work with on a project that no one wants to do. However, a policy that has been extended among all scrums is that we make many critical project decisions as a group, and we do not force anyone to do anything. This way, we foster participation by getting members genuinley motivated to work with each other, as everyone feels happy that they choose a fun project and they want to take it to the next level. This motivation gives our team a common goal, which is what allows us to work together so well. 

We also have a unique style for fostering equity versus equality. We know some people do not work well in some areas of the project, which is why we have a unique strategy of people learning by spending half their time on a part of the project that they are unsure about with someone experienced in the area, and then doing the same with another person in an area that they are familiar with. This allows our team to work on the parts that they love while learning new parts and still staying in the loop with everything that is going on.

## Project follows delivery instructions
With the use of approval strategies and pull requests, we make sure that our code is always working with people checking code to make sure nothing breaks. If something breaks, we keep it in a branch, always making sure the main branch is working, and that we only merge into the main branch when everything is ready. Same thing goes for AWS deployment, with updates when we update the backend. 

## Project is personalized
We have personalized a lot of the frontend and backend of our project, with test data also being personalized.

Backend:
![Custom Backend Index](https://rackets-assets.vercel.app/assets/tri3seed/custombackend.png)
![Custom Backend Users 1](https://rackets-assets.vercel.app/assets/tri3seed/custombackendusers1.png)
![Custom Backend Users 2](https://rackets-assets.vercel.app/assets/tri3seed/custombackendusers2.png)

Frontend:
![Custom Frontend](https://rackets-assets.vercel.app/assets/tri3seed/customfrontend.png)

## Pull Requests/Forks

We make sure that we always use pull requests and forks in our project. As shown before, our master branches are protected such that we need to pull request to access the branch, meaning we cannot commit directly. Moreover, our pull requests require approval by someone else. We don't use forks because we have a custom workflow that automatically updates our branches, which keeps each branch up to date to reduce merge issues, which have been a big thorn in our side. We don't really need to revert changes, but when needed, we have or we have fixed them before we accept pull requests, showcasing our thankfulness to the versatility of Github in this regard.

*I promise that an AI did not write this this was written by me (Rachit)*

## Weekly crossover reviews
We have weekly meetings scheduled on Sunday nights and the end of the workweek to make sure that we are able to review changes and check in with each other. We also make documentation, and all of this can be reviewed on the [issues page - documentation specified](https://github.com/Codemaxxers/Issues/issues?q=is%3Aopen+is%3Aissue+label%3Adocumentation) or the [issues page](https://github.com/Codemaxxers/Issues/issues). We also have a groupchat to let everyone know of important checks and schedule further calls! Let us know if you would like to see it!

