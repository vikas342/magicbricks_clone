using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Property
    {
        public Property()
        {
            PropAmenities = new HashSet<PropAmenity>();
            PropertyImages = new HashSet<PropertyImage>();
            Wishlists = new HashSet<Wishlist>();
        }

        public int PropId { get; set; }
        public int? OwnerDetails { get; set; }
        public int? Address { get; set; }
        public int? PostedBy { get; set; }
        public int? PropFor { get; set; }
        public int? PropType { get; set; }
        public int? Status { get; set; }
        public int Price { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }
        public string? PropDesc { get; set; }

        public virtual Address? AddressNavigation { get; set; }
        public virtual Owner? OwnerDetailsNavigation { get; set; }
        public virtual Object? PostedByNavigation { get; set; }
        public virtual Object? PropForNavigation { get; set; }
        public virtual Object? PropTypeNavigation { get; set; }
        public virtual Object? StatusNavigation { get; set; }
        public virtual ICollection<PropAmenity> PropAmenities { get; set; }
        public virtual ICollection<PropertyImage> PropertyImages { get; set; }
        public virtual ICollection<Wishlist> Wishlists { get; set; }
    }
}
