class QuizModel {
	constructor() {
		this.score = 0;
		this.countQuest = questions.length;
	}

	getQuestion(id) {
		return (questions[id].question);
	}

	getAnswerOptions(id) {
		return (questions[id].answerOptions)
	}

	getComment(id) {
		return (questions[id].comment);
	}

	validateAnswer(id, answerIds) {
		let rightAnswer = questions[id].answer;
		if (answerIds.join() === rightAnswer.join()) {
			this.score += 1;
			return (true);
		}
		return (false);
	}

	checkNextQuest(id) {
		if (id < this.countQuest) {
			return (true);
		}
		return (false);
	}

	countGrade() {
		let grade = this.score / this.countQuest;
		if (grade < 0.3)
			return (2);
		if (grade < 0.5)
			return (3);
		if (grade < 0.7)
			return (4);
		if (grade <= 1)
			return (5);
	}
}