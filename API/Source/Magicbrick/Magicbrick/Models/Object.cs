using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Object
    {
        public Object()
        {
            Addresses = new HashSet<Address>();
            PropAmenities = new HashSet<PropAmenity>();
            PropertyPostedByNavigations = new HashSet<Property>();
            PropertyPropForNavigations = new HashSet<Property>();
            PropertyPropTypeNavigations = new HashSet<Property>();
            PropertyStatusNavigations = new HashSet<Property>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int? ObjTypeId { get; set; }

        public virtual Objecttype? ObjType { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<PropAmenity> PropAmenities { get; set; }
        public virtual ICollection<Property> PropertyPostedByNavigations { get; set; }
        public virtual ICollection<Property> PropertyPropForNavigations { get; set; }
        public virtual ICollection<Property> PropertyPropTypeNavigations { get; set; }
        public virtual ICollection<Property> PropertyStatusNavigations { get; set; }
    }
}
