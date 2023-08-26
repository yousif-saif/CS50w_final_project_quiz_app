// // // Get all categories
// // fetch("https://opentdb.com/api_category.php")
// // .then(response => response.json())
// // .then(response => {
// //     console.log(response)
// // })

// // categories = [
// //     'General Knowledge',
// //     'Entertainment: Books',
// //     'Entertainment: Film',
// //     'Entertainment: Television',
// //     'Entertainment: Video Games',
// //     'Entertainment: Board Games',
// //     'Science & Nature',
// //     'Science: Computers',
// //     'Science: Mathematics',
// //     'Mythology',
// //     'Sports',
// //     'Geography',
// //     'History',
// //     'Politics',
// //     'Art',
// //     'Celebrities',
// //     'Animals',
// //     'Vehicles',
// //     'Entertainment: Comics',
// //     'Science: Gadgets',
// //     'Entertainment: Cartoon & Animations'
// //   ]

// // const accessKey = 'tnNZGyxalKjR7h6f-kUCK_YHi7bZ5Zz1NiuuzqVq7gc'

// // const categories = [
// //   { id: 9, name: 'General Knowledge' },
// //   { id: 10, name: 'Entertainment: Books' },
// //   { id: 11, name: 'Entertainment: Film' },
// //   { id: 13, name: 'Entertainment: Musicals & Theatres' },
// //   { id: 14, name: 'Entertainment: Television' },
// //   { id: 15, name: 'Entertainment: Video Games' },
// //   { id: 16, name: 'Entertainment: Board Games' },
// //   { id: 17, name: 'Science & Nature' },
// //   { id: 18, name: 'Science: Computers' },
// //   { id: 19, name: 'Science: Mathematics' },
// //   { id: 20, name: 'Mythology' },
// //   { id: 21, name: 'Sports' },
// //   { id: 22, name: 'Geography' },
// //   { id: 23, name: 'History' },
// //   { id: 24, name: 'Politics' },
// //   { id: 25, name: 'Art' },
// //   { id: 26, name: 'Celebrities' },
// //   { id: 27, name: 'Animals' },
// //   { id: 28, name: 'Vehicles' },
// //   { id: 29, name: 'Entertainment: Comics' },
// //   { id: 30, name: 'Science: Gadgets' },
// //   { id: 32, name: 'Entertainment: Cartoon & Animations' }
// // ];

// // // get an image for every category

// // categories.forEach((category) => {
// //   fetch(`https://api.unsplash.com/search/photos?query=${category.name}&client_id=${accessKey}`)
// //     .then(response => response.json())
// //     .then(data => {
// //       const imageUrl = data.results[0].urls.regular;
// //       console.log(`${category.id}: ${imageUrl}`);
// //     })
// //     .catch(error => {
// //       console.log(`Error fetching images for category '${category.name}':`, error);
// //     });
// // });

// // // sorting categories in .py file

// // // results

// // // l = {
// // //     21: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxTcG9ydHN8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     27: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxBbmltYWxzfGVufDB8fHx8MTY4OTM0MjE5MXww&ixlib=rb-4.0.3&q=80&w=1080",
// // //     24: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxQb2xpdGljc3xlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     23: "https://images.unsplash.com/photo-1683009427051-00a2fe827a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MXwxfHNlYXJjaHwxfHxIaXN0b3J5fGVufDB8fHx8MTY4OTM0MjE5MXww&ixlib=rb-4.0.3&q=80&w=1080",
// // //     17: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxTY2llbmNlJTIwfGVufDB8fHx8MTY4OTM0MjE5MXww&ixlib=rb-4.0.3&q=80&w=1080",
// // //     29: "https://images.unsplash.com/photo-1607823477522-177cff8183d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwQ29taWNzfGVufDB8fHx8MTY4OTM0MjE5MXww&ixlib=rb-4.0.3&q=80&w=1080",
// // //     25: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxBcnR8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     14: "https://images.unsplash.com/photo-1496381273223-e4ad4e99f5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwVGVsZXZpc2lvbnxlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     22: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxHZW9ncmFwaHl8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     10: "https://images.unsplash.com/photo-1583254152248-b38b72075a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwQm9va3N8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     15: "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwVmlkZW8lMjBHYW1lc3xlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     16: "https://images.unsplash.com/photo-1597075000961-56b7ef72bd17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwQm9hcmQlMjBHYW1lc3xlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     30: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxTY2llbmNlJTNBJTIwR2FkZ2V0c3xlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     11: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwRmlsbXxlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     19: "https://images.unsplash.com/photo-1596496181848-3091d4878b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxTY2llbmNlJTNBJTIwTWF0aGVtYXRpY3N8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     26: "https://images.unsplash.com/photo-1574438831746-b3f4bada685d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxDZWxlYnJpdGllc3xlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     32: "https://images.unsplash.com/photo-1643513754879-294ec4e0dc85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwQ2FydG9vbiUyMHxlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     28: "https://images.unsplash.com/photo-1565043666747-69f6646db940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxWZWhpY2xlc3xlbnwwfHx8fDE2ODkzNDIxOTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     13: "https://images.unsplash.com/photo-1555290239-1350cc7428c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxFbnRlcnRhaW5tZW50JTNBJTIwTXVzaWNhbHMlMjB8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
// // //     9: "https://images.unsplash.com/photo-1593061231114-1798846fd643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxHZW5lcmFsJTIwS25vd2xlZGdlfGVufDB8fHx8MTY4OTM0MjE5MXww&ixlib=rb-4.0.3&q=80&w=1080",
// // //     18: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxTY2llbmNlJTNBJTIwQ29tcHV0ZXJzfGVufDB8fHx8MTY4OTM0MjE5MXww&ixlib=rb-4.0.3&q=80&w=1080",
// // //     20: "https://images.unsplash.com/photo-1552481902-9ef2babf332d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzQ5ODV8MHwxfHNlYXJjaHwxfHxNeXRob2xvZ3l8ZW58MHx8fHwxNjg5MzQyMTkxfDA&ixlib=rb-4.0.3&q=80&w=1080"
// // // }

// fetch("https://opentdb.com/api.php?amount=10&category=19&difficulty=easy")
// .then(response => response.json())
// .then(response => {
//   response.results.forEach(q => {
//     console.log(q.correct_answer)
//     console.log(q.incorrect_answers)
//   });
// })

// let time = 1.3
// let strTime = ""
// let minuts = 0
// let seconds = 0

// while (time != 0){
//   time -= 0.5
//   seconds += 30
//   if (seconds == 60){
//     seconds = 0
//     minuts += 1
//   }

// }

// while (strTime != "0:01"){
//   seconds -= 1
//   if (seconds <= 0){
//     minuts -= 1
//     seconds = 59

//   }

//   strTime = `${minuts}:${seconds}`

//   if (`${seconds}`.length == 1){
//     strTime = `${minuts}:0${seconds}`

//   }
//   console.log(strTime)

// }


let time = 0
const oneSecondAsMilliseconds = 1000
let timeInSeconds = 1
let strTime = ""
let minuts = 0
let seconds = 0

while (timeInSeconds != 0){
	timeInSeconds -= 0.5
	seconds += 30
	if (seconds == 60){
		seconds = 0
		minuts += 1
	}

}

function updateTimer(){
	if (strTime == "0:01"){
		clearInterval()
		return
	}
	seconds -= 1
	if (seconds <= 0){
		minuts -= 1
		seconds = 59

	}

	strTime = `${minuts}:${seconds}`

	if (`${seconds}`.length == 1){
		strTime = `${minuts}:0${seconds}`

	}
	console.log(strTime)

}

setInterval(updateTimer, oneSecondAsMilliseconds)


// const mins = 10
// const seconds = 30

// const timer = parseFloat(`${mins}.${seconds}`)
// console.log(timer, typeof(timer))