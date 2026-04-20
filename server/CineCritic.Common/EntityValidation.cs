namespace CineCritic.Common
{
    public static class EntityValidation
    {
        public const int MovieTitleMinLength = 2;
        public const int MovieTitleMaxLength = 50;

        public const int MovieDescriptionMinLength = 5;
        public const int MovieDescriptionMaxLength = 500;

        public const double MovieRatingMinValue = 1;
        public const double MovieRatingMaxValue = 10;

        public const int MovieDurationMinValue = 1;
        public const int MovieDurationMaxValue = 1000;

        public const int MovieImageUrlMinLength = 5;
        public const int MovieImageUrlMaxLength = 2048;

        public const int MovieTrailerUrlMinLength = 5;
        public const int MovieTrailerUrlMaxLength = 2048;

        public const int MovieDirectorMinLength = 2;
        public const int MovieDirectorMaxLength = 50;

        public const int GenreNameMinLength = 2;
        public const int GenreNameMaxLength = 50;

        public const int CommentContentMinLength = 1;
        public const int CommentContentMaxLength = 50;
    }
}
