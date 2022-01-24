# [**EIGHTY FOUR**](https://eightyfour.vercel.app)

<img src="./demo/eightyfour1.png" width="250"/>
<img src="./demo/eightyfour2.png" width="250"/>
<img src="./demo/eightyfour3.png" width="250"/>

### **Want an app that uses Redux to overkill simple state management in React to have fun with your friends? Try the [Eighty Four](https://eightyfour.vercel.app)**

## **About**
I created Eighty Four to learn, critique(social credit platforms) and demonstrate my knowledge in react. And I faced a lot of problems, and now, I not only learnt a lot about React nesting, Re-renders and state and api request, but how to not make a messy code. I'm a little proud, not for what Eighty Four became, but for what I learnt from it. My latest projects couldn't be as good without Eighty Four.

I usually improve Eighty Four by refactoring code. I learn, I apply, so keep in mind that it doesn't represent 100% of my capicity.

## **Some issues that I'm working on**

- [ ] Users rating not updating after rate added
- [x] Logged user rating not update due Redux-Persist
- [x] Login feedback don't showing
- [x] Improve phones usebility
- [ ] Upgrade the host and change domain
- [x] The empty tab icon (this trigger me too)
- [x] Find more bugs to put here :D (it didn't even take too long)
- [x] The volume is reset to 0.5 each time the song is played

> We are doing very well, hum

### **If you wanna help**
Keep this in mind: to understand the folders, just think like that of the actual project. The folders are related to the real nest, like in the app. I thought it was the easiest way to have a good understanding of the code. Now, they just look kind of weird. But putting them in a single folder doesn't look very good to me, even more so when multiple components.

Everything follows its respective documentation. You will find the Redux stuff in `src/app`, and its "slices" in `src/features`. The RTK api is in `src/app/api`.

#### **How to run**
This project is linked to an external backend created by me, available at this [link](https://github.com/vonweinkeller/eightyfourserver). You can download it and run it on your computer, thus having a whole local environment (both are open source and free to use as you wish).

I made for each part of the project, a different file for the api. I wouldn't do that again 😅. But I think this way a little bit more organised.