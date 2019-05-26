using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; } 
        [Required]
        [StringLength(30, MinimumLength = 6)]
        public string Username { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 6)]
        public string Password { get; set; }
        [StringLength(40, MinimumLength = 6)]
        public string Full_name { get; set; }
        [StringLength(30, MinimumLength = 6)]
        public string Email { get; set; }
        [StringLength(6, MinimumLength = 0)]
        public string Gender { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Registration> Registrations { get; set; }
        public ICollection<Comment> Comments { get; set; }


    }
}
