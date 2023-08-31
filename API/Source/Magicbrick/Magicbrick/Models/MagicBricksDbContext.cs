using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Magicbrick.Models
{
    public partial class MagicBricksDbContext : DbContext
    {
        public MagicBricksDbContext()
        {
        }

        public MagicBricksDbContext(DbContextOptions<MagicBricksDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Object> Objects { get; set; } = null!;
        public virtual DbSet<Objecttype> Objecttypes { get; set; } = null!;
        public virtual DbSet<Owner> Owners { get; set; } = null!;
        public virtual DbSet<PropAmenity> PropAmenities { get; set; } = null!;
        public virtual DbSet<Property> Properties { get; set; } = null!;
        public virtual DbSet<PropertyImage> PropertyImages { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Usersotp> Usersotps { get; set; } = null!;
        public virtual DbSet<Wishlist> Wishlists { get; set; } = null!;
        public virtual DbSet<PropertySps> PropertySps { get; set; } = null!;
        public virtual DbSet<userSP> userSP { get; set; } = null!;



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Server=PC0334\\MSSQL2019;Database=MagicBricksDb;Trusted_Connection=True;TrustServerCertificate=True;");
                optionsBuilder.UseSqlServer("Server=DESKTOP-1CPKOO6\\SQLEXPRESS;Database=MagicBricksDb;Trusted_Connection=True;TrustServerCertificate=True;");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.AddId)
                    .HasName("PK__Address__819EBA9B7D7839D1");

                entity.ToTable("Address");

                entity.Property(e => e.AddId).HasColumnName("Add_Id");

                entity.Property(e => e.Area)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BuildingName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Building_Name");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CityNavigation)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.City)
                    .HasConstraintName("FK__Address__City__6FB49575");

                entity.HasOne(d => d.StateNavigation)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.State)
                    .HasConstraintName("FK__Address__State__6EC0713C");
            });

            modelBuilder.Entity<Object>(entity =>
            {
                entity.ToTable("Object");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ObjTypeId).HasColumnName("Obj_type_Id");

                entity.HasOne(d => d.ObjType)
                    .WithMany(p => p.Objects)
                    .HasForeignKey(d => d.ObjTypeId)
                    .HasConstraintName("FK__Object__Obj_type__31B762FC");
            });

            modelBuilder.Entity<Objecttype>(entity =>
            {
                entity.ToTable("Objecttype");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ParentId).HasColumnName("Parent_Id");
            });

            modelBuilder.Entity<Owner>(entity =>
            {
                entity.ToTable("Owner");

                entity.Property(e => e.ContactNo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contact_no");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OwnerId).HasColumnName("Owner_Id");

                entity.Property(e => e.OwnerName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Owner_Name");

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.Owners)
                    .HasForeignKey(d => d.OwnerId)
                    .HasConstraintName("FK__Owner__Owner_Id__662B2B3B");
            });

            modelBuilder.Entity<PropAmenity>(entity =>
            {
                entity.ToTable("Prop_amenities");

                entity.Property(e => e.AmId).HasColumnName("Am_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PropId).HasColumnName("Prop_Id");

                entity.HasOne(d => d.Am)
                    .WithMany(p => p.PropAmenities)
                    .HasForeignKey(d => d.AmId)
                    .HasConstraintName("FK__Prop_amen__Am_Id__7E02B4CC");

                entity.HasOne(d => d.Prop)
                    .WithMany(p => p.PropAmenities)
                    .HasForeignKey(d => d.PropId)
                    .HasConstraintName("FK__Prop_amen__Prop___7D0E9093");
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.HasKey(e => e.PropId)
                    .HasName("PK__Property__2EC051565ECF93F3");

                entity.ToTable("Property");

                entity.Property(e => e.PropId).HasColumnName("Prop_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OwnerDetails).HasColumnName("Owner_details");

                entity.Property(e => e.PropDesc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Prop_desc");

                entity.Property(e => e.PropFor).HasColumnName("Prop_for");

                entity.Property(e => e.PropType).HasColumnName("Prop_Type");

                entity.HasOne(d => d.AddressNavigation)
                    .WithMany(p => p.Properties)
                    .HasForeignKey(d => d.Address)
                    .HasConstraintName("FK__Property__Addres__73852659");

                entity.HasOne(d => d.OwnerDetailsNavigation)
                    .WithMany(p => p.Properties)
                    .HasForeignKey(d => d.OwnerDetails)
                    .HasConstraintName("FK__Property__Owner___72910220");

                entity.HasOne(d => d.PostedByNavigation)
                    .WithMany(p => p.PropertyPostedByNavigations)
                    .HasForeignKey(d => d.PostedBy)
                    .HasConstraintName("FK__Property__Posted__74794A92");

                entity.HasOne(d => d.PropForNavigation)
                    .WithMany(p => p.PropertyPropForNavigations)
                    .HasForeignKey(d => d.PropFor)
                    .HasConstraintName("FK__Property__Prop_f__756D6ECB");

                entity.HasOne(d => d.PropTypeNavigation)
                    .WithMany(p => p.PropertyPropTypeNavigations)
                    .HasForeignKey(d => d.PropType)
                    .HasConstraintName("FK__Property__Prop_T__76619304");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.PropertyStatusNavigations)
                    .HasForeignKey(d => d.Status)
                    .HasConstraintName("FK__Property__Status__7755B73D");
            });

            modelBuilder.Entity<PropertyImage>(entity =>
            {
                entity.HasKey(e => e.ImgId)
                    .HasName("PK__Property__05B3F79B4FAF5EAD");

                entity.Property(e => e.ImgId).HasColumnName("Img_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Image_url");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PropertyId).HasColumnName("property_id");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.PropertyImages)
                    .HasForeignKey(d => d.PropertyId)
                    .HasConstraintName("FK__PropertyI__prope__7A3223E8");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Role1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Role");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UId)
                    .HasName("PK__Users__5A2040BB6128ADEA");

                entity.Property(e => e.UId).HasColumnName("U_Id");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash).IsUnicode(false);

                entity.Property(e => e.PasswordSalt).IsUnicode(false);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Users__RoleId__3A4CA8FD");
            });

            modelBuilder.Entity<Usersotp>(entity =>
            {
                entity.ToTable("Usersotp");

                entity.Property(e => e.Otp).HasColumnName("otp");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Usersotps)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("FK__Usersotp__Uid__41B8C09B");
            });

            modelBuilder.Entity<Wishlist>(entity =>
            {
                entity.ToTable("Wishlist");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PropId).HasColumnName("Prop_Id");

                entity.Property(e => e.UserId).HasColumnName("User_id");

                entity.HasOne(d => d.Prop)
                    .WithMany(p => p.Wishlists)
                    .HasForeignKey(d => d.PropId)
                    .HasConstraintName("FK__Wishlist__Prop_I__00DF2177");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Wishlists)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Wishlist__User_i__01D345B0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
