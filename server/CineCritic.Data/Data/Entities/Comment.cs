using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static CineCritic.Common.EntityValidation;

namespace CineCritic.Data.Data.Dtos
{
    public class Comment
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(CommentContentMaxLength)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = string.Empty;

        public virtual IdentityUser User { get; set; } = null!;

        [ForeignKey(nameof(Movie))]
        public int MovieId { get; set; }

        public virtual Movie Movie { get; set; } = null!;
    }
}
