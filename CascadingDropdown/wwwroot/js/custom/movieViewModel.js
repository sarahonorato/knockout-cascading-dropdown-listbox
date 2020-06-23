/// <reference path="../knockout/knockout-latest.js" />
/// <reference path="../../lib/jquery/dist/jquery.js" />

function MovieViewModel() {
    var self = this;

    self.movieGenre = ko.observable();
    self.genreOptions = ko.observableArray();
    self.movieListByGenre = ko.observableArray();

    self.genreSelected = ko.dependentObservable({
        read: self.movieGenre,
        write: function (movieGenre) {
            this.movieGenre(movieGenre);
            $.get('/Home/GetMovieListByGenreId', { genre: movieGenre },
                function (result) {
                    if (result !== undefined) {
                        self.movieListByGenre(result);
                    }
                }).fail(function (error) {
                    alert(error);
                });
        },
        owner: self
    });

    $(function () {
        $.get('/Home/GetGenreList',
            function (result) {
                if (result !== undefined) {
                    self.genreOptions(result);
                }
            }).fail(function (error) {
                alert(error);
            });
    });

    self.addMovie = function () {
        $("#moviesAvailable > option:selected").each(function () {
            $(this).remove().appendTo("#moviesSelected");
        });
    };

    self.removeMovie = function () {
        $("#moviesSelected > option:selected").each(function () {
            $(this).remove().appendTo("#moviesAvailable");
        });
    };

    $("#btnSubmitMovies").click(function () {
        var listMovies = [];
        $("#moviesSelected option[value='']").remove();
        $("#moviesSelected option").each(function () {
            listMovies.push("Movie: " + $(this).text() + "/ Id: " + $(this).val());
        });
        alert(listMovies);
    });
}