using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Owner
    {
        public Owner()
        {
            Properties = new HashSet<Property>();
        }

        public int Id { get; set; }
        public int? OwnerId { get; set; }
        public string OwnerName { get; set; } = null!;
        public string ContactNo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }

        public virtual User? OwnerNavigation { get; set; }
        public virtual ICollection<Property> Properties { get; set; }
    }
}
