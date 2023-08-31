using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class User
    {
        public User()
        {
            Owners = new HashSet<Owner>();
            Usersotps = new HashSet<Usersotp>();
            Wishlists = new HashSet<Wishlist>();
        }

        public int UId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string PasswordSalt { get; set; } = null!;
        public int? RoleId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }

        public int Status { get; set; }


        public virtual Role? Role { get; set; }
        public virtual ICollection<Owner> Owners { get; set; }
        public virtual ICollection<Usersotp> Usersotps { get; set; }
        public virtual ICollection<Wishlist> Wishlists { get; set; }



    }
}
