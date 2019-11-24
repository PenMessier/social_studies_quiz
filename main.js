(function ($) {
	$(function () {
		const $main = $('#main');
		const $start = $('[data-start-quiz]');

		$start.on('click', () => {
			const quizModel = new QuizModel();
			const quizComponent = new QuizComponent($main, quizModel);
			quizComponent.renderQuestion(0);
		});
	});
})(jQuery);