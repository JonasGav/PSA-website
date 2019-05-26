using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Comment
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Text { get; set;}
        [Required]
        [ForeignKey("Event")]
        public int EventId { get; set; }
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

    }
}
