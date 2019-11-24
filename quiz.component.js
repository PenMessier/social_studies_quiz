class QuizComponent {
	constructor($main, model) {
		this.$main = $main;
		this.model = model;
	}

	renderQuestion(id) {
		this.$template = $($('[data-template="question"]').text());
		this.$questText = this.$template.find('[data-quest-text]');
		this.$answerOptions = this.$template.find('[data-answer-options]');
		this.$confirmAnswer = this.$template.find('[data-confirm-answer]');
		this.$questNumber = this.$template.find('[data-quest-number]');
		this.$momentScore = this.$template.find('[data-moment-score]');
		const $questCount = this.$template.find('[data-quest-count]');
		
		this.$commentTemplate = $($('[data-template="commentAnswer"]').text());
		this.$answerStatus = this.$commentTemplate.find('[data-answer-status]');
		this.$answerComment = this.$commentTemplate.find('[data-comment-answer]');
		this.$nextQuest = this.$commentTemplate.find('[data-next-quest]');

		let question = this.model.getQuestion(id);
		let optionList = this.model.getAnswerOptions(id);

		this.$questNumber.html(id + 1);
		this.$questText.html(question);
		$questCount.text(this.model.countQuest);
		this.$momentScore.text(this.model.score);

		$.each(optionList, (key, option) => {
			this.$answerOptionTemplate = $($('[data-template="answer"]').text());
			let $answerOption = this.$answerOptionTemplate.find('[data-answer-option]');
			let $optionId = this.$answerOptionTemplate.find('[data-answer-option-id]');
			$answerOption.html(option);
			$optionId.attr('id', key);
			this.$answerOptionTemplate.insertBefore(this.$confirmAnswer);
		});


		this.$answerOptions.find('input')
		.on('change', () => this.validate());

		this.$confirmAnswer.on('click', () => this.onAnswerConfirm(id));

		this.$nextQuest.on('click', () => this.onNextQuest(id + 1));
		this.$main.html(this.$template);
	}

	renderLastPage() {
		const $lastPageTemplate = $($('[data-template="lastPage"]').text());
		const $questCount = $lastPageTemplate.find('[data-quest-count]');
		const $momentScore = $lastPageTemplate.find('[data-moment-score]');
		const $grade = $lastPageTemplate.find('[data-grade]');
		$questCount.text(this.model.countQuest);
		$momentScore.text(this.model.score);
		$grade.text(this.model.countGrade());

		this.$main.html($lastPageTemplate);
	}

	validate() {
		this.$checkedOptions = this.$answerOptions.find('input:checked');
		if (this.$checkedOptions.length)
			this.$confirmAnswer.removeAttr('disabled');
		else
			this.$confirmAnswer.attr('disabled', 'disabled');
	}

	onAnswerConfirm(id) {
		let answerIds = [];
		this.$checkedOptions.each((i, v) => {
			answerIds.push($(v).attr('id'));
		});
		this.$answerOptions.addClass("text-center");
		if (!this.model.validateAnswer(id, answerIds)) {
			this.$answerStatus
			.text('Failure!!!')
			.parent().addClass('text-danger')
			.removeClass('text-success');
			this.$answerComment.text(this.model.getComment(id));
		}
		else {
			this.$answerStatus
			.text('Success!!!')
			.parent().addClass('text-success')
			.removeClass('text-danger');
			this.$momentScore.text(this.model.score);
		}
		this.$answerOptions.html(this.$commentTemplate);
	}

	onNextQuest(id) {
		if (this.model.checkNextQuest(id)) {
			this.renderQuestion(id);
		}
		else {
			this.renderLastPage();
		}
	}
}