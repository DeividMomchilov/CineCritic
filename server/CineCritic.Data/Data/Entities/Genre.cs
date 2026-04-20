using System.ComponentModel.DataAnnotations;
using static CineCritic.Common.EntityValidation;

namespace CineCritic.Data.Data.Dtos
{
    public class Genre
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(GenreNameMaxLength)]
        public string Name { get; set; } = string.Empty;

        public virtual ICollection<Movie> Movies { get; set; } 
            = new HashSet<Movie>();
    }
}
