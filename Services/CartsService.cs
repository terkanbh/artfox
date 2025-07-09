namespace Services;

using Database;
using Database.Models;
using Services.DTOs.Carts;
using Microsoft.EntityFrameworkCore;

public class CartsService
{
    private readonly Context _context;

    public CartsService(Context context)
    {
        _context = context;
    }

    public async Task<CartItemDTO[]> AddItemAsync(string cartId, string itemId, int qty)
    {
        var cart = await GetCartWithRelatedEntitiesAsync(cartId); 

        var item = await _context.Artworks.FindAsync(itemId);
        if (item == null)
            throw new Exception("Item not found.");

        var cartItem = cart.Items.FirstOrDefault(x => x.ArtworkId == itemId);
        if (cartItem != null)
        {
            return await UpdateItemAsync(cartId, itemId, qty);
        }

        cartItem = new CartItem
        {
            Id = Guid.NewGuid().ToString(),
            CartId = cartId,
            ArtworkId = itemId,
            Quantity = qty
        };

        await _context.CartItems.AddAsync(cartItem);
        cart.ModifiedAt = DateTimeOffset.UtcNow;
        await _context.SaveChangesAsync();

        return await GetItemsAsync(cartId);
    }

    public bool Exists(string? cartId)
    {
        if (cartId == null)
        {
            return false;
        }

        return _context.Carts.Any(x => x.Id == cartId);
    }

    public async Task<string> CreateAsync()
    {
        var cart = new Cart
        {
            Id = Guid.NewGuid().ToString(),
            CreatedAt = DateTimeOffset.UtcNow,
            ModifiedAt = DateTimeOffset.UtcNow
        };

        await _context.Carts.AddAsync(cart);
        await _context.SaveChangesAsync();

        return cart.Id;
    }

    public async Task<CartItemDTO[]> ClearAsync(string cartId)
    {
        var cartItems = await _context.CartItems
        .Where(x => x.CartId == cartId)
        .ToListAsync();

        foreach(var item in cartItems)
        {
            _context.Remove(item);
        }

        await _context.SaveChangesAsync();

        return [];
    }

    public async Task<CartItemDTO[]> DeleteItemAsync(string cartId, string itemId)
    {
        var cart = await GetCartWithRelatedEntitiesAsync(cartId);

        var cartItem = cart.Items.FirstOrDefault(x => x.ArtworkId == itemId);

        if (cartItem == null)
            throw new Exception("Cart Item not found.");

        _context.CartItems.Remove(cartItem);
        cart.ModifiedAt = DateTimeOffset.UtcNow;
        await _context.SaveChangesAsync();

        return await GetItemsAsync(cartId);
    }

    public async Task<CartItemDTO[]> GetItemsAsync(string cartId)
    {
        var cart = await GetCartWithRelatedEntitiesAsync(cartId);

        var cartItems = new List<CartItemDTO>();
        foreach(var cartItem in cart.Items)
        {
            cartItems.Add(new CartItemDTO
            {
                Id = cartItem.ArtworkId,
                Title = cartItem.Artwork!.Title,
                Price = cartItem.Artwork!.Price,
                ImageData = cartItem.Artwork!.Images.FirstOrDefault(x => x.DisplayOrder == 0)!.ImageData,
                Quantity = cartItem.Quantity
            });
        }

        return cartItems.ToArray();
    }

    public async Task<CartItemDTO[]> UpdateItemAsync(string cartId, string itemId, int qty)
    {
        var cart = await GetCartWithRelatedEntitiesAsync(cartId);

        var cartItem = cart.Items.FirstOrDefault(x => x.ArtworkId == itemId);

        if (cartItem == null)
            throw new Exception("Cart Item not found.");

        cartItem.Quantity = qty;
        cart.ModifiedAt = DateTimeOffset.UtcNow;
        await _context.SaveChangesAsync();
        
        return await GetItemsAsync(cartId);
    }

    private async Task<Cart> GetCartWithRelatedEntitiesAsync(string cartId)
    {
        var cart = await _context.Carts
        .Include(cart => cart.Items)
        .ThenInclude(cartItem => cartItem.Artwork)
        .ThenInclude(artwork => artwork!.Images)
        .FirstOrDefaultAsync(x => x.Id == cartId);

        if (cart  == null)
            throw new Exception("Cart not found.");

        return cart;
    }
}