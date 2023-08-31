using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Objecttype
    {
        public Objecttype()
        {
            Addresses = new HashSet<Address>();
            Objects = new HashSet<Object>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int? ParentId { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Object> Objects { get; set; }
    }
}
