using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class backendContext : DbContext
    {
        public backendContext(DbContextOptions<backendContext> options) : base(options) { }

        public DbSet<backend.Models.User> Users { get; set; }

        public DbSet<backend.Models.Event> Event { get; set; }

        public DbSet<backend.Models.Comment> Comment { get; set; }

        public DbSet<backend.Models.Registration> Registration { get; set; }
    }
}
