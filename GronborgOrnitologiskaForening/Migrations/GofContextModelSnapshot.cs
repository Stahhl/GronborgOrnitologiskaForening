﻿// <auto-generated />
using GOF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GOF.Migrations
{
    [DbContext(typeof(GofContext))]
    partial class GofContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GOF.Models.BirdWatch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BirdFamily");

                    b.Property<string>("BirdName");

                    b.Property<string>("DateAndTime");

                    b.Property<string>("Location");

                    b.Property<string>("PersonName");

                    b.HasKey("Id");

                    b.ToTable("BirdWatchs");
                });

            modelBuilder.Entity("GOF.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BirdWatchId");

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.HasIndex("BirdWatchId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("GOF.Models.Comment", b =>
                {
                    b.HasOne("GOF.Models.BirdWatch", "MyBirdWatch")
                        .WithMany("MyComments")
                        .HasForeignKey("BirdWatchId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
