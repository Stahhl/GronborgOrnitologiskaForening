using Microsoft.EntityFrameworkCore;

namespace GOF.Models
{
    public class GofContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = (localdb)\\mssqllocaldb; Database = GofDb; Trusted_Connection = True; ");
        }
        public GofContext(DbContextOptions<GofContext> options)
            : base(options)
        {
        }
        public DbSet<BirdWatch> BirdWatchs { get; set; }
        public DbSet<Comment> Comments { get; set; }

    }
}