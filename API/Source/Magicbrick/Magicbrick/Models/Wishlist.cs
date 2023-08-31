using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Wishlist
    {
        public int Id { get; set; }
        public int? PropId { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }

        public virtual Property? Prop { get; set; }
        public virtual User? User { get; set; }
    }
}
