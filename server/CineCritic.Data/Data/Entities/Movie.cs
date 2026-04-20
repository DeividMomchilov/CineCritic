using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static CineCritic.Common.EntityValidation;

namespace CineCritic.Data.Data.Dtos
{
    public class Movie
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(MovieTitleMaxLength)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(MovieDescriptionMaxLength)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        [MaxLength(MovieImageUrlMaxLength)]
        public string ImageUrl { get; set; } = string.Empty;

        [Required]
        [MaxLength(MovieTrailerUrlMaxLength)]
        public string TrailerUrl { get; set; } = string.Empty;

        [Required]
        [MaxLength(MovieDirectorMaxLength)]
        public string Director { get; set; } = string.Empty;

        [ForeignKey(nameof(Creator))]
        public string CreatorID { get; set; } = string.Empty;

        public virtual IdentityUser Creator { get; set; } = null!;

        public virtual ICollection<Genre> Genres { get; set; } 
            = new List<Genre>();

        public virtual ICollection<Comment> Comments { get; set; }
            = new HashSet<Comment>();
    }
}
