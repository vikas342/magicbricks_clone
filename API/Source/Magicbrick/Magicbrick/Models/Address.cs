using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Address
    {
        public Address()
        {
            Properties = new HashSet<Property>();
        }

        public int AddId { get; set; }
        public string BuildingName { get; set; } = null!;
        public string Area { get; set; } = null!;
        public int? State { get; set; }
        public int? City { get; set; }
        public string Pincode { get; set; } = null!;
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }

        public virtual Object? CityNavigation { get; set; }
        public virtual Objecttype? StateNavigation { get; set; }
        public virtual ICollection<Property> Properties { get; set; }
    }
}
