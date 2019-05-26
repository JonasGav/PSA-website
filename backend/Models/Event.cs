using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Event
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        public string Coordinates { get; set; }
        public string Description { get; set; }
        public int MaxReservation { get; set; }
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Registration> Registrations { get; set; }
    }
}
